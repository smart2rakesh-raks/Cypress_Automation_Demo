Cypress.Commands.add('login', (email, password) =>{
    cy.get('#Email').type(email)
    cy.get('#Password').type(password)
    cy.get('.buttons').contains('Log in').click()
})