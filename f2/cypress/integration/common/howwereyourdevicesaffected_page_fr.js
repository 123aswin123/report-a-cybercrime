import { After, When, And, Then } from 'cypress-cucumber-preprocessor/steps'

When('I fill Howwereyourdevicesaffected in French page forms', () => {
  cy.get('form').find('[name="device"]').type('Tablette Surface')
  cy.get('form').find('[name="account"]').type('DisneyPlus')
})
