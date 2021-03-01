/// <reference types="cypress" />
describe('My First Test', () => {
  it('clicking "type" shows the right headings', () => {
    cy.visit('https://192.168.1.187:8457/')

    //cy.pause()
    cy.wait(2000)


    //cy.url().should('include', '/login')
    //cy.get('#user')
    //   .type('admin')
    //   .should('have.value', 'admin')
    //
    // cy.get('#password')
    //     .type('fusion')
    //
    // cy.get('.uwf-btn')
    // .should('not.be.disabled')
    // .click()
    //
    // cy.wait(5000)

    cy.url().should('include', '/spog/dashboard')

    // add applaince

    cy.contains('Add Appliance').click()

    cy.get('#ipInput').type("192.168.1.1")

    cy.get('.port-container > .uwf-btn')
    .should('not.be.disabled')
    .click()


  })
})
