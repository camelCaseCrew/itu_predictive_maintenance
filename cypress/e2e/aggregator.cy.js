describe('Data aggregator health check', () => {
    it('Visits the aggregator http site', () => {
        cy.request('http://localhost:8003')
        .its('status')
        .should('equal', 200)
    })
})

describe('Metrics check', () => {
    it('Checks that the correct metrics are shown', () => {
        cy.request('http://localhost:8003/metrics')
        .its('body')
        .should('contain', 'device_health')
    })
})