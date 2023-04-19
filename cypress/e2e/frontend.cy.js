import 'cypress-iframe';

const dimensions = require('../dimensions.js')

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

  describe('Navbar test', () => {
    it('Ensures functionality of navbar button', () => {
      cy.visit('http://localhost:3001')
      cy.get('#Health-Graphs-id').click()
      cy.url().should('include', '/healthgraphs')
    })
  })