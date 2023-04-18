describe('Preliminary front end test on health_graphs page', () => {
    it('Visits the frontend website', () => {
      cy.visit('http://localhost:3001/health_graphs') 
      cy.contains('hello there') // text on the website
    })
  })

describe('Grafana Graph test, will break if health_graphs page is removed', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/health_graphs')
      cy.get('iframe[src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&from=1679499012553&to=1679520612553&panelId=2"]').should('exist'); 
      // ^hardcoded for the homepage graph^
    })
  })