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
