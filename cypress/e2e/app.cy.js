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

