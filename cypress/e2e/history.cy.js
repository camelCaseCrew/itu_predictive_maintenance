//Check each device type is option for filtering
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('harddrive')
      cy.get('.p-multiselect-panel').contains('sensor')
    })
  })

//Check harddrive filtering works
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.wait(10000)
      cy.get('.p-multiselect-panel').contains('harddrive').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Harddrive')
      })
    })
  })

//Check sensor filtering works
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.wait(10000)
      cy.get('.p-multiselect-panel').contains('sensor').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Sensor')
      })
    })
  })

// Tests the feedback button

describe('Feedback button test', () => {
  it('Tests that the feedback exists and can be clicked', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('[data-testid="feedback-button"]').first().click()
  })
})

describe('Database query test', () => {
  it('Tests if database was updated after feedback button was clicked', () => {
    cy.visit('http://localhost:3001/history')
    cy.get('div[id="feedback-button"]').first().click()
    cy.wait(1000)
    // Create a new PostgreSQL client
    cy.task('connectDB', 'SELECT COUNT(*) FROM prediction_feedback').then( (res) => {
      const count = parseInt(res[0].count)
      cy.wrap(count).should('be.gt', 0)
    })
  });
});