// Home page tests

describe('Presence of Logo', () => {
  it('Checks for the presence of and "PredictIT"', () => {
    cy.visit('http://localhost:3001')
    cy.contains('PredictIT') 
  })
})

describe('Presence of bar graph test', () => {
  it('Tests that the grafana bar graph is on the page', () => {
    cy.visit('http://localhost:3001')
    cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&kiosk"]').should('exist');
  })
})

// Navbar tests

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
    cy.visit('http://localhost:3001/test')
    cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&from=1679499012553&to=1679520612553&panelId=2"]').should('exist');
    // ^hardcoded for the homepage graph^
  })
})

