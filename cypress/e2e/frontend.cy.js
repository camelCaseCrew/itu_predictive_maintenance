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

  describe('LogData component is creating functional elements', () => {
    Object.values(dimensions).map((key, i) => {
      it('Graph goes to /health_graph', () => {
        cy.viewport(key.viewportWidth, key.viewportHeight)
        cy.visit('http://localhost:3001/history')
        cy.get('[id=Critical-goto-graph-id]').click()
        cy.url().should('include', '/health_graphs')
      })
    })
  })

