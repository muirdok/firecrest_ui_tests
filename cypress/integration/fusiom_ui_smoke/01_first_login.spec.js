/// <reference types="cypress" />
describe('My First Test', () => {
  it('clicking "type" shows the right headings', () => {
    cy.visit(Cypress.env('url'))

    cy.url().should('include', '/login')
    cy.get('#user')
      .type(Cypress.env('def_login'))
      .should('have.value', Cypress.env('def_login'))

    cy.get('#password')
        .type(Cypress.env('def_pass'))

    cy.get('.uwf-btn')
    .should('not.be.disabled')
    .click()

    cy.url().should('include', '/spog/dashboard')

    // add applaince

    cy.contains('Add Appliance').click()

    cy.get('#ipInput').type(Cypress.env('fc_applaince_ip'))

    cy.contains('Detect')
    .should('not.be.disabled')
    .click()

    cy.contains('Do you trust the following certificate').should('be.visible')

    cy.contains('I Trust this Certificate').should('be.visible')

    cy.get('[type="checkbox"]').check()

    cy.get('#userInput')
    .should('have.value', Cypress.env('fc_def_login'))

    cy.get('#pwdInput')
    .type(Cypress.env('fc_def_pass'))

    cy.get('.uwf-btn_dark')
    .should('not.be.disabled')
    .click()

    cy.wait(3000)

    cy.get('.node__details__host', { timeout: 10000 })
    .should('be.visible')

    cy.contains("https://" + Cypress.env('fc_applaince_ip') + ":8443").should('be.visible')

    cy.get('.appliance__actions__icon > .uwf-svg-icon > svg').click()

    cy.contains('Do you want').should('be.visible')
    cy.get('.uwf-modal__header')
    .contains('Remove')
    .should('be.visible')

    cy.get(':nth-child(2) > .checkbox > .ng-untouched > .uwf-checkbox').click()
    cy.get(':nth-child(3) > .checkbox > .ng-untouched > .uwf-checkbox').click()

    cy.get('.uwf-modal__footer')
    .contains('Remove').click()

    cy.contains('Are you sure').should('be.visible')

    cy.get('.uwf-confirmation-dialog__buttons')
    .contains('Yes').click()

    cy.contains('No Appliances found').should('be.visible')

  })
})
