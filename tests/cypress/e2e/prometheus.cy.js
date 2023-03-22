describe('PromQL statements', () => {
  it('makes sure that queries return expected output format', () => {

    // Query for healthy devices
    cy.request('localhost:9090/api/v1/query?query=count(device_health<0.01)').its('body').then((body) => {
      expect(body.data.result.length).to.be.lessThan(2)
      if (body.data.result.length === 1) {
        expect(parseInt(body.data.result[0].value[1])).to.be.greaterThan(-1)
      }
    })

    // Query for unhealthy devices
    cy.request('localhost:9090/api/v1/query?query=count(device_health < 0.5 and device_health >= 0.1)').its('body').then((body) => {
      expect(body.data.result.length).to.be.lessThan(2)
      if (body.data.result.length === 1) {
        expect(parseInt(body.data.result[0].value[1])).to.be.greaterThan(-1)
      }
    })

    // Query for critical devices
    cy.request('localhost:9090/api/v1/query?query=count(device_health>=0.5)').its('body').then((body) => {
      expect(body.data.result.length).to.be.lessThan(2)
      if (body.data.result.length === 1) {
        expect(parseInt(body.data.result[0].value[1])).to.be.greaterThan(-1)
      }
    })

  })
})

describe('Prometheus health check', () => {
  it('checks the health of prometheus', () => {
    cy.request('localhost:9090/-/healthy').its('body').should('include', 'Prometheus Server is Healthy.')
  })
})