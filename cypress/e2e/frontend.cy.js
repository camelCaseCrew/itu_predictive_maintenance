import 'cypress-iframe';

describe('Preliminary front end test', () => {
  it('Visits the frontend website', () => {
    cy.visit('http://localhost:3001/test') 
  })
})

describe('Grafana Graph test, will break if test page is removed', () => {
  it('Visits the test page', () => {
    cy.visit('http://localhost:3001/test')
    cy.get('iframe[src="http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk"]').should('exist'); 
    // ^hardcoded for the homepage graph^
  })
})

describe('Filtering buttons works', () => {
  it('Checks that filtering buttons have been created', () => {
    cy.visit('http://localhost:3001/test')

    // check filtering buttons exist
    cy.get('select[name="healthFilter"]').should('exist')
    cy.get('input[name="serialNumberFilter"]').should('exist')
    cy.get('input[name="modelFilter"').should('exist')
    cy.get('input[name="timeFilter"').should('exist')

    // filter by risk group
    cy.get('select[name="healthFilter"]').select('Critical')
    cy.get('iframe').invoke('attr', 'src').should('contain', 'var-risk_group=critical')

    // filter by search
    cy.get('input[name="serialNumberFilter"]').type('aoao{enter}')
    cy.get('iframe').invoke('attr', 'src').should('contain', 'var-serial_number=aoao')
    /*
    cy.frameLoaded()
    const device = cy.iframe().find('div[class="grafana-app"]', {timeout: 20000 })
    device.find('div[class="panel-title"]').find('h2').should('contain', 'aoao')
    */
    
    // filter by time
    cy.get('input[name="timeFilter"]').parent().click().contains('Last 1 hour').click()
    cy.get('iframe').invoke('attr', 'src').should('contain', 'from=now-1h&to=now')
  })
})

describe('Navbar test', () => {
  it('Ensures functionality of navbar button', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/healthgraphs')
  })
})