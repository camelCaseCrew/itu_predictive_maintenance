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

describe('Critical health information box content', () => {
  it('Tests the content of the critical health information box', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Critical-health-box').should('contain', /\d+\.\d*%/) // This regex matches with a percentage, e.g. 0.5% or 99.98%
  })
})

describe('Risk health information box content', () => {
  it('Tests the content of the risk health information box', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Risk-health-box').should('contain', /\d+\.\d*%/)
  })
})

describe('Healthy health information box content', () => {
  it('Tests the content of the healthy health information box', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Healthy-health-box').should('contain', /\d+\.\d*%/)
  })
})

describe('Critical goto button test', () => {
  it('Tests that the critical goto button exists and leads to health graphs with critical filter turned on', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Critical-goto-btn-id').click()
    cy.url().should('include', '/health_graphs')
    cy.url().should('include', 'health=critical')
  })
})

describe('Risk goto button test', () => {
  it('Tests that the risk goto button exists and leads to health graphs with risk filter turned on', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Risk-goto-btn-id').click()
    cy.url().should('include', '/health_graphs')
    cy.url().should('include', 'health=risk')
  })
})

describe('Healthy goto button test', () => {
  it('Tests that the healthy goto button exists and leads to health graphs with healthy filter turned on', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Healthy-goto-btn-id').click()
    cy.url().should('include', '/health_graphs')
    cy.url().should('include', 'health=healthy')
  })
})

// Navbar tests

describe('Health graph button test', () => {
  it('Tests that the health graph button leads to healthgraphs page', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/healthgraphs')
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

