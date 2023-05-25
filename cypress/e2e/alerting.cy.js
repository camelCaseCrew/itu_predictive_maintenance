describe('Alert activated', () => {
    it('Checks that prometheus alerts have been activated', () => {
        cy.request('http://localhost:9090/api/v1/alerts')
        .its('status')
        .should('equal', 200)
    })
})
