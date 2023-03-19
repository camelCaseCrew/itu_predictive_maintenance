describe('Grafana health check', () => {
  it('checks the health of Grafana', () => {
    cy.request('localhost:3000/api/health').its('body').then((body) => {
      expect(body.database).to.eq('ok')
    })
  })
})

describe('Check configuration', () => {
  it('Checks that configuration files configure grafana correctly', () => {
    cy.request('http://admin:admin@localhost:3000/api/datasources').its('body').then(body => {
      expect(body[0].name).to.equal('Prometheus')
    })
    cy.request('http://admin:admin@localhost:3000/api/dashboards/uid/en2yCsa4k').its('body').then(body => {
      expect(body.dashboard.title).to.equal('Overview of devices')
    })
  })
})