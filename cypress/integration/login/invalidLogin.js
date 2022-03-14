describe('Conduit Login', () => {
	it('validates a login with valid credentials', function () {
		const { login, topNav } = this.cyTest.pages;
		const email = this.cyTest.faker.internet.email();
        const errorMessage = 'email or password is invalid';
        const password = this.cyTest.faker.internet.password();
		const username = this.cyTest.faker.name.firstName();

		cy.login(email, password);
		cy.get(login.error).should('contain.text', errorMessage).and('be.visible')
	});
});
