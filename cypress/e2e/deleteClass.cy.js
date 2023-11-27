import "cypress-real-events";
const base_url = "https://gymbro-management-system.vercel.app"

describe('Delete Class', () => {
    it('successfully Delete Class', function () {
      // destructuring assignment of the this.currentUser object
      const username="admin"
      const password="admin"
  
      cy.visit(`${base_url}/authentication/login`)
      cy.get('Input[name=username]').type(username)

    cy.get('Input[name=password]').type(`${password}`)
    cy.realPress('Tab');
    cy.wait(100);
    cy.realPress('Enter');

    cy.wait(5000)

    cy.contains("Classes").click()
    cy.wait(5000)
    cy.viewport(1100,700)
    let i = 0
    for(i;i<7;i++){
      cy.realPress('Tab');
      cy.wait(100);
    }
    cy.realPress('Enter')
    
    cy.realPress('Tab');
    cy.wait(100)
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.wait(100)
    cy.realPress('Enter')
    cy.realPress('Enter')
    
    cy.get('h3').should('not.have.value', 'Test Title')
    })
  })