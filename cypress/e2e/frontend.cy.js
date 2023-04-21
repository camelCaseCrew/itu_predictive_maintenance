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

    // filter by time
    cy.get('input[id="timeFilter"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains("Last 1 hour").click()
    cy.get('iframe').invoke('attr', 'src').should('contain', 'from=now-1h&to=now')

    /*
    // filter by search
    cy.get('input[id="serialNumberFilter"]').type('aoao{enter}')
    cy.get('iframe').invoke('attr', 'src').should('contain', 'var-serial_number=aoao')

    cy.frameLoaded()
    const device = cy.iframe().find('div[class="grafana-app"]', {timeout: 20000 })
    device.find('div[class="panel-title"]').find('h2').should('contain', 'aoao')
    */
  })
})

/*
describe('Navbar test', () => {
  it('Ensures functionality of navbar button', () => {
    cy.visit('http://localhost:3001')
    cy.get('#Health-Graphs-id').click()
    cy.url().should('include', '/healthgraphs')
  })
})
*/