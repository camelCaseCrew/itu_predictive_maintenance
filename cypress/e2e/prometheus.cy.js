describe('Prometheus health check', () => {
  it('checks the health of prometheus', () => {
    cy.request('localhost:9090/-/healthy').its('body').should('include', 'Prometheus Server is Healthy.')
  })
})