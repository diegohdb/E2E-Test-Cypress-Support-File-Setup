import './commands';
const pages = require('./pages/pages')

const user = {
	email: Cypress.env('AUTH_EMAIL'),
	password: Cypress.env('AUTH_PASSWORD'),
    username: Cypress.env('AUTH_USERNAME'),
};

const generateTestObject = () => ({
	pages,
	user,
});

beforeEach(() => {
	cy.wrap(generateTestObject()).as('cyTest');
});
