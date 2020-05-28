describe('Remove tests', () => {
    beforeEach (() => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('abhisha@gmail.com')
        cy.get('#password').type('Test1234')
        cy.get('#submit').click()
        cy.url().should('eq', 'http://localhost:3000/home')
    });
    it('Remove with items there', () => {
        cy.get('#viewOrderButton').click()
        cy.url().should('eq', 'http://localhost:3000/viewBookings')
        cy.get('#orderCards').first().get("#remove").click()
        cy.wait(1000)
        cy.get('#confirmDelete').click({force:true})


    })
    it('Remove with no items', () => {
        cy.get('#viewOrderButton').click()
        cy.url().should('eq', 'http://localhost:3000/viewBookings')
        cy.get('p').contains("You don't have any orders yet");
    })
})