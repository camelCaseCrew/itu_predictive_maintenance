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