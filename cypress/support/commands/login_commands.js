const pages = require('../pages/pages')

Cypress.Commands.add('login', (username, password) => {
    cy.visit(pages.home.url)

    cy.get(pages.topNav.login).click()
    cy.get(pages.login.email).type(username)
    cy.get(pages.login.password).type(password)
    cy.get(pages.login.loginButton).click()
});
