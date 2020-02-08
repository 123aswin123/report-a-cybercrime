# Report a cybercrime / Signalez un crime informatique

Exploring a service that makes it easier for Canadians and businesses to report
when they encounter or are victims of a cybercrime and that helps police
analyze and investigate reports.

Explorer la possibilité de mettre en place un service permettant aux Canadiens
et aux entreprises de signaler plus aisément les crimes informatiques et
facilitant le travail d'analyse et d'enquête de la police.

## Installation

Requires node.

```
cd f2
npm install
```

## Running locally

Note that you must be in the `f2` directory to run the code.

### Set up Azure Key Vault

We currently pull `cosmosdbName` and `cosmosdbKey` from Azure Key Vault

### Set up the environment

Some features require you to define some environmental
variables. You can add them to App Service, or for locally either `export` in your terminal or add to `f2/.env`.

#### Google Analytics

```sh
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

#### Azure Key Vault

```sh
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
AZURE_TENANT_ID=...
KEY_VAULT_NAME=...
```

### Run with create-react-app

```
npm run dev
```

### Run project with Docker

```
docker build -t rac .
docker run -p 3000:3000 rac
```

### Load testing

There are simple scripts to load test the frontend. They use the [k6](https://docs.k6.io) package, which must first be installed (see (https://docs.k6.io/docs/installation)

To run the tests, set the environment variable `LOAD_TESTING_BASE_URL` to the url of the website, for example

```
LOAD_TESTING_BASE_URL=https://report-a-scam.azurewebsites.net
```

and then run

```
k6 run -vu 150 -d10s f2/utils/loadTesting.js
```

Notes:

- the `http_req_duration` line shows how long the requests took (from sending request to receiving response)
- the `iterations` line shows the number of requests per second (should be approximately 100/s bor both)
