describe('Checks each device type is option for filtering', () => {
    it('Looks at type options', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('.p-multiselect').contains('Type').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('harddrive')
      cy.get('.p-multiselect-panel').contains('sensor')
    })
  })

describe('Checks each device type is option for filtering', () => {
    it('Checks the filtering works for Harddrives', () => {
      cy.visit('http://localhost:3001/history')
      cy.wait(10000)
      cy.get('.p-multiselect').contains('Type').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('harddrive').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Harddrive')
      })
    })
  })

describe('Checks each device type is option for filtering', () => {
    it('Checks the filtering works for Sensor', () => {
      cy.visit('http://localhost:3001/history')
      cy.wait(10000)
      cy.get('.p-multiselect').contains('Type').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('sensor').click()
      cy.get('#parent').scrollTo(0, 1000)
      cy.get('.infinite-scroll-component > li').each((item) => {
        expect(item).to.contain('Sensor')
      })
    })
  })
  
describe('Checks each device type is option for filtering', () => {
    it('Looks at serial number options', () => {
      cy.visit('http://localhost:3001/history')
      cy.request('http://localhost:9090/api/v1/label/serial_number/values').then(
        (response) => {
            cy.log(response.body)
            cy.get('.p-multiselect').contains('Serial number').click({ multiple: true })
            cy.get('.p-multiselect-items > li').each((item) => {
                expect(response.body.data).to.contain(item.children('span').eq(0).text())
            })
        }
      )
    })
  })
 
describe('Checks filtering works for the first serial number', () => {
    it('Checks filtering works for the first serial number', () => {
      cy.visit('http://localhost:3001/history')
      cy.wait(10000)
      cy.get('.p-multiselect').contains('Serial number').click({ multiple: true })
      cy.get('.p-multiselect-items > li').each((item) => {
        cy.get('.p-multiselect-panel').contains(item.children('span').eq(0).text()).click()
        cy.get('.infinite-scroll-component > li').each((log) => {
          expect(log).to.contain(item.children('span').eq(0).text())
        })
        cy.get('.p-multiselect-panel').contains(item.children('span').eq(0).text()).click()
      })
    })
  })