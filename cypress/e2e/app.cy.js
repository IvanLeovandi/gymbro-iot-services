import "cypress-real-events";
const base_url = "https://gymbro-management-system.vercel.app"

describe('Home Page', () => {
    it('Home Page Loads', () => {
      // Start from the index page
      cy.visit(`${base_url}`)

      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('Welcome to the')
    })
  })

describe('Navigation', () => {
    it('should navigate to the Classes page', () => {
      // Start from the index page
      cy.visit(`${base_url}`)

      // Find a link with an href attribute containing "about" and click it
      cy.contains("Classes").click()
   
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
  
      cy.visit(`${base_url}/authentication/login`)
      let i = 0
      for(i;i<5;i++){
        cy.realPress('Tab');
      }
      cy.realType(username)
  
      // {enter} causes the form to submit
  
      cy.realPress('Tab');
      cy.realType(password)
  
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.wait(5000)
      // we should be redirected to /dashboard
      cy.url().should('include', '/profile')
  
  
      // UI should reflect this user being logged in
      cy.get('p').should('contain', 'admin')
    })
  })

  describe('The Login Error Page', () => {
    it('successfully log in as admin', function () {
      // destructuring assignment of the this.currentUser object
      const username="as"
      const password="admin"
  
      cy.visit(`${base_url}/authentication/login`)
      let i = 0
      for(i;i<5;i++){
        cy.realPress('Tab');
      }
      cy.realType(username)
  
      // {enter} causes the form to submit
  
      cy.realPress('Tab');
      cy.realType(password)
  
      cy.realPress('Tab');
      cy.realPress('Enter');
      // we should be redirected to /dashboard
  
  
      // UI should reflect this user being logged in
      cy.get('p').should('contain', 'Username atau password salah')
    })
  })

  describe('Add Class', () => {
    it('successfully Add Class', function () {
      // destructuring assignment of the this.currentUser object
      const username="admin"
      const password="admin"
  
      cy.visit(`${base_url}/authentication/login`)
      cy.get('Input[name=username]').type(username)

    cy.get('Input[name=password]').type(`${password}`)
    cy.realPress('Tab');
    cy.wait(100);
    cy.realPress('Enter');

    cy.wait(8000)
    cy.contains("Classes").click()
    cy.get('button').contains('Add Class').click()
    cy.realPress('Tab');
    cy.realType('Test Title')
    cy.realPress('Tab');
    cy.realType('Test Instructor')
    cy.realPress('Tab');
    cy.realType('06062024')
    cy.realPress('Tab');
    cy.realType('1503')
    cy.realPress('Tab');
    cy.realType('Test Fitness')
    cy.realPress('Tab');
    cy.realType('5')
    cy.realPress('Tab');
    cy.realType('100000')
    cy.realPress('Tab');
    cy.realType('Test Class by Cypress')
    cy.realPress('Tab');
    cy.realPress('Enter');

    cy.get('h3').should('contain', 'Test Title')
    })
  })