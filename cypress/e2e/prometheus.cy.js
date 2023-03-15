describe('PromQL statements', () => {
  it('checks the health of prometheus', () => {
    cy.request('localhost:9090/api/v1/query?query=count(device_health<0.01)').its('body').then((body) => {
      expect(body.data.result[0].value[0]).to.be.greaterThan(0)
    })
  })
})

describe('Prometheus health check', () => {
  it('checks the health of prometheus', () => {
    cy.request('localhost:9090/-/healthy').its('body').should('include', 'Prometheus Server is Healthy.')
  })
})