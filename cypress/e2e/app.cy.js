describe('Home Page', () => {
    it('Home Page Loads', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')

      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('Welcome to the')
    })
  })

describe('Navigation', () => {
    it('should navigate to the Classes page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')

      // Find a link with an href attribute containing "about" and click it
      cy.contains("Classes").click()
      cy.wait(10000)
   
      // The new url should include "/about"
      cy.url().should('include', '/classes')
   
      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('Classes')
    })
  })

describe('The Login Page', () => {
  it('successfully log in as admin', function () {
    // destructuring assignment of the this.currentUser object
    const username="admin"
    const password="admin"

    cy.visit('localhost:3000/authentication/login')

    cy.get('input[name=username]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(password)

    cy.get('Button[name=login]').click()
    // we should be redirected to /dashboard
    cy.wait(10000)
    cy.url().should('include', '/profile')


    // UI should reflect this user being logged in
    cy.get('p').should('contain', 'admin')
  })
})