/// <reference types="cypress" />
describe('My First Test', () => {
  it('clicking "type" shows the right headings', () => {
    cy.visit()

    //cy.pause()
    cy.wait(2000)


    cy.url().should('include', '/login')
    cy.get('#user')
      .type(Cypress.env('def_login'))
      .should('have.value', Cypress.env('def_login'))

    cy.get('#password')
        .type(Cypress.env('def_pass'))

    cy.get('.uwf-btn')
    .should('not.be.disabled')
    .click()

    cy.wait(5000)

    cy.url().should('include', '/spog/dashboard')

    // add applaince

    cy.contains('Add Appliance').click()

    cy.get('#ipInput').type(Cypress.env('fc_applaince'))

    cy.get('.port-container > .uwf-btn')
    .should('not.be.disabled')
    .click()


  })
})
