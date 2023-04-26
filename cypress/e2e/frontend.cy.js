import 'cypress-iframe';

const dimensions = require('../dimensions.js')
// Home page tests

describe('Presence of bar graph test', () => {
  Object.values(dimensions).map((key, i) => {
    it('Tests that the grafana bar graph is on the page', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&kiosk&refresh=20s"]').should('exist');
    })
  })
})

// Home page - Overview buttons

describe('Critical button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Critical button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Critical-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Grafana Graph test, will break if health_graphs page is removed', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/health_graphs')
      cy.get('iframe[src="http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=60s&kiosk"]').should('exist'); 
    })
  })

describe('Risk button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Risk button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Risk-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})


describe('Healthy button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001')
      cy.get('[id=Healthy-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

// Navbar tests

describe('Presence of Logo', () => {
  it('Checks for the presence of and "PredictIT"', () => {
    cy.visit('http://localhost:3001')
    cy.contains('Systematic')
    cy.contains('PredictIT')
  })
})

describe('Health graph button test', () => {
  it('Tests that the health graph button leads to healthgraphs page', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/health_graphs')
  })
})

describe('Back button test', () => {
  it('Tests that the back button leads to the previous page', () => {
    cy.visit('http://localhost:3001')
    cy.visit('http://localhost:3001/health_graphs')
    cy.get('#Back-Button').click()
    cy.url().should('equal', 'http://localhost:3001/')
  })
})


// Health Graphs page tests

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3001/health_graphs')
    cy.get('iframe[src="http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=60s&kiosk"]').should('exist');
    // ^hardcoded for the homepage graph^
  })
})


  // History page related tests

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



  

