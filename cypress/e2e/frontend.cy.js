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

describe('Grafana graph test', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/health_graphs')
      cy.get('iframe[src="http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk"]').should('exist'); 
    })
})

describe('Filtering buttons works', () => {
  it('Checks that filtering buttons have been created', () => {
    cy.visit('http://localhost:3001/health_graphs')

    // check filtering buttons exist
    cy.get('input[id="healthFilter"]').should('exist')
    cy.get('input[id="modelFilter"]').should('exist')
    cy.get('input[id="timeFilter"]').should('exist')
    cy.get('input[id="deviceFilter"]').should('exist')
    cy.get('input[id="serialFilter"]').should('exist')

    // filter by risk group
    cy.get('input[id="healthFilter"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Risk').click()
    cy.get('iframe').invoke('attr', 'src').should('contain', 'var-risk_group=risk')

    // filter by model
    cy.get('input[id="modelFilter"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').should('exist')

    // filter by time
    cy.get('input[id="timeFilter"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Last 1 hour').click()
    cy.get('iframe').invoke('attr', 'src').should('contain', 'from=now-1h&to=now')

    // filter by device
    cy.get('input[id="deviceFilter"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Sensor').click()
    cy.get('iframe').invoke('attr', 'src').should('contain', 'var-device_type=sensor')

    // filter by serial number
    cy.get('input[id="serialFilter"]').parent().parent().click()
    cy.get('ul[class="p-multiselect-items p-component p-virtualscroller-content"]').should('exist')
  })
})

describe('Navbar test', () => {
  it('Ensures functionality of navbar button', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Health Graphs-id').click()
    cy.url().should('include', '/health_graphs')
  })
})