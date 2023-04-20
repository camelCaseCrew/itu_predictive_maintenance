// Home page tests

describe('Presence of Logo', () => {
  it('Checks for the presence of "Systematic" and "PredictIT"', () => {
    cy.visit('http://localhost:3003')
    cy.contains('Systematic')
    cy.contains('PredictIT') 
  })
})

describe('Presence of bar graph test', () => {
  it('Tests that the grafana bar graph is on the page', () => {
    cy.visit('http://localhost:3003')
    cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&kiosk"]').should('exist');
  })
})

describe('Navbar test', () => {
  it('Ensures functionality of navbar button', () => {
    cy.visit('http://localhost:3003')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/healthgraphs')
  })
})

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3003/test')
    cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&from=1679499012553&to=1679520612553&panelId=2"]').should('exist');
    // ^hardcoded for the homepage graph^
  })
})

