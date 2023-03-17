describe('Grafana health check', () => {
  it('checks the health of Grafana', () => {
    cy.request('localhost:3000/api/health').its('body').then((body) => {
      expect(body.database).to.eq('ok')
      })
  })
})

describe('Check configuration', () => {
  it('Checks that configuration files configure grafana correctly', () => {
    cy.request({
      url: 'localhost:3000/api/datasources',
      auth: {
        'bearer': 'eyJrIjoiTEx1NmVvcHY3NTk2dEhPQ042Z1R0NE5DN0NVbkZ1YXkiLCJuIjoiY3lwcmVzcyIsImlkIjoxfQ=='
      }}
      ).its('body').then((body) => {
      expect(body[0].uid).to.equal('TSwyULa4z')
      expect(body[0].name).to.equal('Prometheus')
    })

    cy.request({
      url: 'localhost:3000/api/dashboards/uid/en2yCsa4k',
      auth: {
        'bearer': 'eyJrIjoiTEx1NmVvcHY3NTk2dEhPQ042Z1R0NE5DN0NVbkZ1YXkiLCJuIjoiY3lwcmVzcyIsImlkIjoxfQ=='
      }}).its('body').then((body) => {
      cy.log(body)
      expect(body.dashboard.uid).to.equal('en2yCsa4k')
      expect(body.dashboard.title).to.equal('Overview of devices')
    })  
  })
})