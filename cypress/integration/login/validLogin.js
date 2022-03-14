describe('Conduit Login', () => {
	it('validates a login with valid credentials', function () {
		const { home, login, topNav } = this.cyTest.pages;
		const email = this.cyTest.user.email;
        const password = this.cyTest.user.password;
		const username = this.cyTest.user.username;

		cy.visit(home.url)

		cy.get(topNav.login).click()
		cy.url().should('include', 'https://demo.realworld.io/#/login')
		cy.get(login.email).type(email)
		cy.get(login.password).type(password)
		cy.get(login.loginButton).click()

		cy.get(topNav.username).should('contain.text', username).and('be.visible');
	});
});
