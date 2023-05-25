
// Health Graphs page tests

describe('Health-graphs tab title', () => {
    it('Tab title equals "PredictIT - Health-Graphs"', () => {
    cy.visit('http://localhost:3001/health_graphs')
    cy.title().should('eq', "PredictIT - Health-Graphs")
    })
})

describe('Grafana Graph test, will break if test page is removed', () => {
    it('Visits the test page', () => {
      cy.visit('http://localhost:3001/health_graphs')
      cy.get('iframe').should('exist');
    })
  })

// Back button test

describe('Back button test', () => {
    it('Tests that the back button leads to the previous page', () => {
        cy.visit('http://localhost:3001')
        cy.visit('http://localhost:3001/health_graphs')
        cy.get('#Back-Button').click()
        cy.url().should('equal', 'http://localhost:3001/')
    })
})

// Filtering tests

describe('Filtering buttons exist', () => {
    it('Checks that filtering buttons have been created', () => {
        cy.visit('http://localhost:3001/health_graphs')

        // check filtering buttons exist
        cy.get('input[id="healthFilter"]').should('exist')
        cy.get('input[id="modelFilter"]').should('exist')
        cy.get('input[id="timeFilter"]').should('exist')
        cy.get('input[id="deviceFilter"]').should('exist')
        cy.get('input[id="serialFilter"]').should('exist')
    })
})

describe('Risk group filter test', () => {
    it('Checks that risk group filter works', () => {
        cy.visit('http://localhost:3001/health_graphs')
        // filter by risk group
        cy.get('input[id="healthFilter"]').parent().parent().click()
        cy.get('ul[class="p-dropdown-items"]').contains('Risk').click()
        cy.get('iframe').invoke('attr', 'src').should('contain', 'var-risk_group=risk')
    })
})

describe('Model filter test', () => {
    it('Checks that model filter works', () => {
        cy.visit('http://localhost:3001/health_graphs')
        // filter by model
        cy.get('input[id="modelFilter"]').parent().parent().click()
        cy.get('ul[class="p-dropdown-items"]').should('exist')
    })
})

describe('Time filter test', () => {
    it('Checks that time filter works', () => {
        cy.visit('http://localhost:3001/health_graphs')
        // filter by time
        cy.get('input[id="timeFilter"]').parent().parent().click()
        cy.get('ul[class="p-dropdown-items"]').contains('Last 1 hour').click()
        cy.get('iframe').invoke('attr', 'src').should('contain', 'from=now-1h&to=now')
    })
})

describe('Device filter test', () => {
    it('Checks that device filter works', () => {
        cy.visit('http://localhost:3001/health_graphs')
        // filter by device
        cy.get('input[id="deviceFilter"]').parent().parent().click()
        cy.get('ul[class="p-dropdown-items"]').contains('Sensor').click()
        cy.get('iframe').invoke('attr', 'src').should('contain', 'var-device_type=sensor')
    })
})

describe('Serial number filter test', () => {
    it('Checks that serial number filter works', () => {
        cy.visit('http://localhost:3001/health_graphs')
        // filter by serial number
        cy.get('input[id="serialFilter"]').parent().parent().click()
        cy.get('ul[class="p-multiselect-items p-component p-virtualscroller-content"]').should('exist')
    })
})