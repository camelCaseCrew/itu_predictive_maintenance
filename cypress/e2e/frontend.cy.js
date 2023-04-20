import 'cypress-iframe';

const dimensions = require('../dimensions.js')
// Home page tests

describe('Presence of bar graph test', () => {
  Object.values(dimensions).map((key, i) => {
    it('Tests that the grafana bar graph is on the page', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3003')
      cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&kiosk"]').should('exist');
    })
  })
})

// Home page - Overview buttons

describe('Critical button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Critical button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3003')
      cy.get('[id=Critical-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Risk button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Risk button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3003')
      cy.get('[id=Risk-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

describe('Healthy button goes to /health_graph', () => {
  Object.values(dimensions).map((key, i) => {
    it('Healthy button goes to /health_graph', () => {
      cy.viewport(key.viewportWidth, key.viewportHeight)
      cy.visit('http://localhost:3003')
      cy.get('[id=Healthy-goto-btn-id]').click()
      cy.url().should('include', '/health_graphs')
    })
  })
})

// Navbar tests

describe('Presence of Logo', () => {
  it('Checks for the presence of and "PredictIT"', () => {
    cy.visit('http://localhost:3003')
    cy.contains('PredictIT') 
  })
})

describe('Health graph button test', () => {
  it('Tests that the health graph button leads to healthgraphs page', () => {
    cy.visit('http://localhost:3003')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/health_graphs')
  })
})

// Health Graphs page tests

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3003/test')
    cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&from=1679499012553&to=1679520612553&panelId=2"]').should('exist');
    // ^hardcoded for the homepage graph^
  })
})

