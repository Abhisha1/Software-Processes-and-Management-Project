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
        cy.get('#orderCards').first().get("#modify").click()
        cy.wait(1000)
        cy.get('#confirmModify').click({force:true})
        cy.url().should('eq', 'http://localhost:3000/order')
    })
    it('Modify with no items', () => {
        cy.get('#viewOrderButton').click()
        cy.url().should('eq', 'http://localhost:3000/viewBookings')
        cy.get('p').contains("You don't have any orders yet");
    })
    it('Add, then modify then add', () => {
        cy.get('#linkToOrder').click()
        cy.url().should('eq', 'http://localhost:3000/order')
        cy.get('#addToCartButton').click()
        cy.get('.react-datepicker__input-container').find('input').type('2020-05-29')
        cy.get("#dropdown-basic").click()
        cy.get('.dropdown-item').first().click()
        cy.get('#submitOrder').click()
        cy.get('#linkToHome').click()
        cy.url().should('eq', 'http://localhost:3000/home')
        
        cy.get('#viewOrderButton').click()
        cy.url().should('eq', 'http://localhost:3000/viewBookings')
        cy.get('#orderCards').first().get("#modify").click()
        cy.wait(1000)
        cy.get('#confirmModify').click({force:true})
        cy.url().should('eq', 'http://localhost:3000/order')

        cy.get('#addToCartButton').click()
        cy.get('.react-datepicker__input-container').find('input').type('2020-05-29')
        cy.get("#dropdown-basic").click()
        cy.get('.dropdown-item').first().click()
        cy.get('#submitOrder').click()
        cy.get('#linkToHome').click()
        cy.url().should('eq', 'http://localhost:3000/home')
    })
})