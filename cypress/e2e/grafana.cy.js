describe('Grafana health check', () => {
  it('checks the health of Grafana', () => {
    cy.request('localhost:3000/api/health').its('body').then((body) => {
      expect(body.database).to.eq('ok')
      })
  })
})