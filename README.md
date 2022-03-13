<h1 align="left">:computer: E2E-Test-Cypress-Setup  </h1>

This is a simple and detailed tutorial for an E2E test project using Cypress

## Introduction

This project contains a tutorial for E2E test automation of the <a href="https://demo.realworld.io/#/">Conduit website</a>.
The automation will cover only few tests since the main idea is to setup the framework from scratch and add the details for anyone that wants to create this setup by their own.


## Environment Setup

**Prerequisites:**
* <a href="https://nodejs.org/en/download/"> NodeJS </a>

## Starting a NPM Project:
- Start a npm project, issue the below command in project root directory.
```
npm init
```

The NPM will create a project, and you'll need to fill some info about your project.

## Installing and Starting Cypress:
- Install Cypress:
```
npm install cypress
```

- Run Cypress to start the framework:
```
npx cypress open
```

The Cypress IDE will be launched with some test files example.

![alt ide](images/cypress_ide.png)

Delete example files (if you want to). On the IDE you can click in the button or you can delete the whole folder located on *cypress/integration*

The project structure should be like this at this point:

![alt project](images/project_tree.png)

## Setup Base URL:

- Add the test base_url in cypress.json file:
Since we are going to test the Conduit website, the base url will be -*https://demo.realworld.io/#/*-
```
{
    "baseUrl": "https://demo.realworld.io/#/"
}
```

## Create and map the pages:
- Add a *pages* folder in *cypress/support*
![alt project](images/project_pages.png)

- Create a *pageName.js* file for each page
```
export default {
    email: '[type="email"]',
    loginButton: '.btn-lg',
    password: 'type="password"',
    title: '.auth-page h1',
    url: 'https://demo.realworld.io/#/login'
};
```

- Create a *pages.js* to map all page files to be exported:
```
const pages = {
    home: require('./home'),
    login: require('./login'),
    topNav: require('./top_nav'),
}

module.exports = pages
```

## Install and configure Cypress dotenv:
The <a href="https://www.npmjs.com/package/cypress-dotenv">Cypress dotenv</a> is a NPM library that will load any environment variables defined in your `.env` file so you can access them via Cypress.env() from within your tests as you would expect.

- Install the Cypress dotenv:
```
npm i cypress-dotenv
```

- Setup the plugin in the *cypress/plugins/index.js*
```
/// <reference types="cypress" />

const dotenvPlugin = require('cypress-dotenv');
module.exports = (on, config) => {
  config = dotenvPlugin(config)
  return config
}
```

- Create and add variable in the *cypress.env.json* file in the root:
Since we are going to login in the application, create an user and add the email and login in this file. This file won't be commited since it contains sensitive data.
```
{
  "AUTH_EMAIL": "@yourEmail",
  "AUTH_PASSWORD": "@yourPassword",
  "AUTH_USERNAME": "@yourUsername"
}
```

## Create a setup file
- Create a *setup.js* file in *cypress/support*
The Cypress will read this file when started, so we can define some data to be used in all tests through a global hook, such as a *beforeEach()* with an object that contains the **pages** and **user** data. And also, we can import other files like **customized commands**.

This object will make the tests clean since we don't need to import a lot of stuff on each test file.

The setup will be like this:

```
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
```

- Add the *cypress/support/setup.js* as a support file in Cypress.json

```
{
    "baseUrl": "https://demo.realworld.io/#/",
    "supportFile": "cypress/support/setup.js"
}
```

## Create commands folder

- For a more organized commands you can create a commands folder in *support/commands* and inside it add the command types in files, for example, a *login* command will be added inside the *loggin_commands.js*.

![alt project](images/commands.png)

A login_commands file will be like this:
```
const pages = require('../pages/pages')

Cypress.Commands.add('login', (username, password) => {
    cy.visit(pages.home.url)

    cy.get(pages.topNav.login).click()
    cy.get(pages.login.email).type(username)
    cy.get(pages.login.password).type(password)
    cy.get(pages.login.loginButton).click()
});
```

- Add the command file in the *commands.js* file:
```
// import 'cypress-commands'
import './commands/login_commands'
```

Since all commands were imported from *setup.js* the cy.login() command will be available in all tests without any further imports.


# Create test
- Create the tests inside integration folder. Since we're using a global hook for before each, I prefer to create a file for each test. But this is a personal option.

An example of a test for valid login with this setup will be:
```
describe('Conduit Login', () => {
	it('validates a login with valid credentials', function () {
		const { topNav } = this.cyTest.pages;
		const email = this.cyTest.user.email;
        const password = this.cyTest.user.password;
		const username = this.cyTest.user.username;

		cy.login(email, password);
		cy.get(topNav.username).should('contain.text', username)
	});
});
```

# Executing this E2E tests
- Launch the Cypress IDE (you can add this as a script in the *package.json*):
```
npx cypress open
```

And then, choose the test to run.


# To Do
- Further information for optimization will be added in this repo later. And also, a linter and pipeline setup.


## Author
<a target="_blank" href="https://github.com/diegohdb/diegohdb">👤 Diego Bezerra </a>

<a target="_blank" href="https://www.linkedin.com/in/diegohdb/">
  <img align="left" alt="LinkdeIN" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />
</a>

<a target="_blank" href="https://www.instagram.com/diegohdb/">
  <img align="left" alt="Instagram" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/instagram.svg" />
</a>

<a target="_blank" href="mailto:diegohdb@gmail.com">
  <img align="left" alt="Gmail" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/gmail.svg" />
</a>


