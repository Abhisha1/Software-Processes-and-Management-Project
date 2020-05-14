describe('Sign up tests', () => {
    it('Sign up with existing email and new password', () => {
        cy.visit("http://localhost:3000/user");
        cy.get('#email').type('emacario1997@hotmail.com')
        cy.get('#password').type('password123')
        cy.get('#submit').click()
        cy.get('#error').should('have.text', 'The details you entered are invalid, please try again')
    })
})