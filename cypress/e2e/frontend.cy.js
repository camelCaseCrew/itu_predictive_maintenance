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

describe('Check that each row has Max 4 graphs on health_graphs page', () => {
  Object.values(dimensions).map((key, i) => {
    it('Visits the frontend website', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3001/health_graphs') 
      var width = cy.config().viewportWidth
      cy.frameLoaded('iframe')
      //This tests that the width of a single Graph is larger than 1/5 of the screen, since this means that
      //The tightest they can be group is in 4 per row
      cy.iframe().find('section[class="panel-container"]').invoke('width').should('be.gt', width/5)
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

// Health Graphs page tests

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3001/health_graphs')
    cy.get('iframe[src="http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=60s&kiosk"]').should('exist');
    // ^hardcoded for the homepage graph^
  })
})

