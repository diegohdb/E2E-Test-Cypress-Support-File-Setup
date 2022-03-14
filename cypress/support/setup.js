import './commands';
const pages = require('./pages/pages')
const { faker } = require('@faker-js/faker');

const user = {
	email: Cypress.env('AUTH_EMAIL'),
	password: Cypress.env('AUTH_PASSWORD'),
    username: Cypress.env('AUTH_USERNAME'),
};

const generateTestObject = () => ({
	faker,
	pages,
	user,
});

beforeEach(() => {
	cy.wrap(generateTestObject()).as('cyTest');
});
