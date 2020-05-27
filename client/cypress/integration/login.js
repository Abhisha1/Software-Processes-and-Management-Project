describe('Logging in tests', () => {
    it('Login as user with correct values', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('abhisha@gmail.com')
        cy.get('#password').type('Test1234')
        cy.get('#submit').click()
        cy.url().should('eq', 'http://localhost:3000/home')

    })
    it('Login as admin with correct values', () => {
        cy.visit('http://localhost:3000/login');
        cy.get("#adminLoginBox").click()
        cy.get('#email').type('abhisha@gmail.com')
        cy.get('#password').type('Test1234')
        cy.get('#submit').click()
        cy.url().should('eq', 'http://localhost:3000/viewBookings')

    })
    it('Login with incorrect email', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('asha@gmail.com')
        cy.get('#password').type('Test1234')
        cy.get('#submit').click()
        cy.get('#error').should('have.text', 'The details you entered are invalid, please try again')

    })
    it('Login with incorrect password', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('abhisha@gmail.com')
        cy.get('#password').type('Test4')
        cy.get('#submit').click()
        cy.get('#error').should('have.text', 'The details you entered are invalid, please try again')

    })
    it('Login with no input', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('abhisha@gmail.com')
        cy.get('#password').type('Test4')
        cy.get('#submit').click()
        cy.url().should('eq', 'http://localhost:3000/login')
    })
})