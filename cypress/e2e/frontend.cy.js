describe('Preliminary front end test', () => {
    it('Visits the frontend website', () => {
      cy.visit('http://localhost:3001/test') 
      cy.contains('hello there') // text on the website
    })
  })

describe('Grafana Graph test, will break if test page is removed', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/test')
      cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&from=1679499012553&to=1679520612553&panelId=2"]').should('exist'); 
      // ^hardcoded for the homepage graph^
    })
  })

  describe('Navbar button for health graphs works', () => {
    it('Ensures functionality of navbar button', () => {
      cy.visit('http://localhost:3001')
      cy.get('#Health-Graphs-id').click()
      cy.url().should('include', '/healthgraphs')
    })
  })

  describe('Navbar button for history works', () => {
    it('Ensures functionality of navbar button', () => {
      cy.visit('http://localhost:3001')
      cy.get('#History-id').click()
      cy.url().should('include', '/history')
    })
  })

  describe('Logs are shown', () => {
    beforeEach(() => {
      // Set up the route to the page containing the components
      cy.visit('http://localhost:3001/history');
    });
  
    it('Checks if components exist and function properly', () => {
      // Check if the container and inner-container exist
      cy.get('[data-testid="container"]').should('exist');
      cy.get('[data-testid="inner-container"]').should('exist');
  
      // Check if the text elements exist
      cy.get('[data-testid="serial-number"]').should('exist');
      cy.get('[data-testid="date"]').should('exist');
      cy.get('[data-testid="type"]').should('exist');
      cy.get('[data-testid="percentage"]').should('exist');
  
      // Check if the ImageButton exists
      cy.get('[data-testid="image-button"]').should('exist');
    });
  });

  describe('Logs are scrollable', () => {
    it('Checks if components exist and function properly', () => {
      cy.visit('http://localhost:3001/history')

      cy.get('.infinite-scroll-component').find('div').its('length').then((amount) => {
        cy.get('#parent').scrollTo('0%', '100%')
        cy.get('.infinite-scroll-component').find('div').its('length').should('be.greaterThan', amount)
      })
    });
  });



  

