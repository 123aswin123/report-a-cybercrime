#!/bin/bash

export PROJECT_NAME=rcmpcybercrime
export RG_NAME=MpPCCDSCybercrimeRG
export ACR_NAME=MpPCCDSCybercrimeacr
export IMAGE_NAME=f2
export DB_NAME=mppccdscybercrimecosdb
export PLAN_NAME=MpPCCDSCybercrimeazappplan
export APP_NAME=MpPCCDSCybercrimeazapp
export SERVICE_PRINCIPAL_NAME=MpPCCDSCybercrimeACR-sp
export VIRUS_SCANNER_NAME=mppccdscybercrimeclamav
export COGNITIVE_NAME=MpPCCogContMod1
export WAF_RG=MpPCCorenetRg
export WAF_NAME=MpPCWafGw
export WAF_FRONTEND_IP=appGatewayFrontendIP
export WAF_SUBSCRIPTION=MpPSub
# Set up Azure
## Resource group
az group create --name $RG_NAME --location canadacentral
az configure --defaults group=$RG_NAME location=canadacentral    # set default resource group
## Container registry
ACR_REGISTRY_ID=$(az acr create --name $ACR_NAME --sku standard --query id --output tsv)
## Database
az cosmosdb create --name $DB_NAME --kind MongoDB
## Antivirus Scanner - Currently not using the alpine version because mk0x needs to rebuild from clamd v102.2 or 103 to pickup known azure bugfix.
# See https://bugzilla.clamav.net/show_bug.cgi?id=12469
az container create --resource-group $RG_NAME --name $VIRUS_SCANNER_NAME --image mk0x/docker-clamav --dns-name-label $VIRUS_SCANNER_NAME --ports 3310
## Azure Cognitive Services - Content Moderator
az cognitiveservices account create --name $COGNITIVE_NAME --resource-group $RG_NAME --kind ContentModerator --sku F0 --location canadacentral --yes
# Deploy code
## Docker image
az acr build --registry $ACR_NAME --image $IMAGE_NAME ../f2
### ACR access
SP_PASSWD=$(az ad sp create-for-rbac --name http://$SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query password --output tsv)
SP_APP_ID=$(az ad sp show --id http://$SERVICE_PRINCIPAL_NAME --query appId --output tsv)
## App Service
### Create
# Note: Once created it seems like I've had to restart the app service perhaps to get it working
# It may be that the service principle is taking longer to create and it's not ready by the time the app is configured...
az appservice plan create --name $PLAN_NAME --sku P1V2 --is-linux
az webapp create --name $APP_NAME --plan $PLAN_NAME --deployment-container-image-name ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:latest
az webapp config container set --name $APP_NAME --resource-group $RG_NAME --docker-custom-image-name ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:latest --docker-registry-server-url https://${ACR_NAME}.azurecr.io --docker-registry-server-user $SP_APP_ID --docker-registry-server-password $SP_PASSWD
### Environmental variables
export COSMO_KEY=`az cosmosdb keys list --name $DB_NAME --query "primaryMasterKey" | sed -e 's/^"//' -e 's/"$//'`
az webapp config appsettings set  --name $APP_NAME --settings COSMOSDB_NAME=$DB_NAME COSMOSDB_KEY=$COSMO_KEY
### Continuous deployment
az webapp deployment container config --enable-cd true --name $APP_NAME
## Configure the App Service to apply network restrictions to the SCM site as well
az webapp config access-restriction set --resource-group $RG_NAME --name $APP_NAME --use-same-restrictions-for-scm-site true
## Get public IP address of the Application Gateway to use when configuring network restrictions
publicIpID="$(az network application-gateway frontend-ip show --resource-group $WAF_RG --gateway-name $WAF_NAME --name $WAF_FRONTEND_IP --subscription $WAF_SUBSCRIPTION --query 'publicIpAddress.id' --output tsv)"
publicIP="$(az network public-ip show --ids $publicIpID --query 'ipAddress' --output tsv)"
publicIP="${publicIP}/32"
## Configure the App Service network restrictions.
# When adding your first IP Restriction rule, the service will add an explicit deny all rule with a priority of 2147483647.
# In practice, the explicit deny all rule will be last rule executed and will block access to any IP address that is not explicitly allowed using an Allow rule.
az webapp config access-restriction add --resource-group $RG_NAME --name $APP_NAME --rule-name 'Allow from WAF' --action Allow --ip-address $publicIP --priority 1000