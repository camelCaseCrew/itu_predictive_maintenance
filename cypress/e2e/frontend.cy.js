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
    cy.get('select[name="Health"]').should('exist')
    cy.get('input[type="text"]').should('exist')

    // try to filter
    cy.get('select[name="Health"]').select('Critical')
    cy.get('input[type="text"]').type('aoao{enter}')
    
    cy.frameLoaded('iframe')
    cy.iframe().find('div[class="panel-title"]').find('h2').should('contain', 'aoao')
  })
})