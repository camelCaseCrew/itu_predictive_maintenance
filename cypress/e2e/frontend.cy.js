describe('Preliminary front end test', () => {
    it('Visits the frontend website', () => {
      cy.visit('http://localhost:3001/test') // Change the port number to match your local server
      cy.contains('hello there') // Replace with the text on your homepage
    })
  })