//Check each device type is option for filtering
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3003/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('harddrive')
      cy.get('.p-multiselect-panel').contains('sensor')
    })
  })

//Check harddrive filtering works
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3003/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.wait(10000)
      cy.get('.p-multiselect-panel').contains('harddrive').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Harddrive')
      })
    })
  })

//Check sensor filtering works
describe('Checks each device type is option for filtering', () => {
    it('Visits looks at type options', () => {
      cy.visit('http://localhost:3003/history')
      cy.get('.p-multiselect').click({ multiple: true })
      cy.wait(10000)
      cy.get('.p-multiselect-panel').contains('sensor').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Sensor')
      })
    })
  })
