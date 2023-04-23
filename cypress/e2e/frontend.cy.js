import 'cypress-iframe';

describe('Preliminary front end test', () => {
  it('Visits the frontend website', () => {
    cy.visit('http://localhost:3003/test') 
  })
})

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3003/test')
    cy.get('iframe[src="http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk"]').should('exist'); 
    // ^hardcoded for the homepage graph^
  })
})

describe('Filtering buttons works', () => {
  it('Checks that filtering buttons have been created', () => {
    cy.visit('http://localhost:3003/test')

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
    cy.get('ul[class="p-dropdown-items"]').should('exist')
  })
})

describe('Navbar test', () => {
  it('Ensures functionality of navbar button', () => {
    cy.visit('http://localhost:3003')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/healthgraphs')
  })
})