import { When } from 'cypress-cucumber-preprocessor/steps'

When('I fill Howwaspersonalinformationaffected in French page forms', () => {
  cy.get('form')
    .find('[value="typeOfInfoReq.creditCard"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoReq.dob"]').check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoReq.homeAddress"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoReq.sin"]').check({ force: true })
  cy.get('form').find('[value="typeOfInfoReq.other"]').check({ force: true })
  //cy.get('form').find('[name="infoReqOther"]').type('Permis de conduire')
  cy.get('form')
    .find('[value="typeOfInfoObtained.creditCard"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoObtained.dob"]').check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoObtained.homeAddress"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoObtained.sin"]').check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoObtained.other"]')
    .check({ force: true })
  //cy.get('form').find('[name="infoObtainedOther"]').type('Permis de conduire')
})

When('I fill Howwaspersonalinformationaffected123 in French page forms', () => {
  cy.get('form')
    .find('[value="typeOfInfoReq.creditCard"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoReq.dob"]').check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoReq.homeAddress"]')
    .check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoObtained.creditCard"]')
    .check({ force: true })
  cy.get('form').find('[value="typeOfInfoObtained.dob"]').check({ force: true })
  cy.get('form')
    .find('[value="typeOfInfoObtained.homeAddress"]')
    .check({ force: true })
})
