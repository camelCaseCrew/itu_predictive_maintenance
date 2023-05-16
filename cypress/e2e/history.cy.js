describe('History tab title', () => {
  it('Tab title equals "PredictIT - History"', () => {
    cy.visit('http://localhost:3003/history')
    cy.title().should('eq', "PredictIT - History")
  })
})

describe('Checks each device type is option for filtering', () => {
    it('Looks at type options', () => {
      cy.visit('http://localhost:3001/history')
      cy.wait(3000)
      cy.get('.p-multiselect').contains('Type').click({ multiple: true })
      cy.get('.p-multiselect-panel').contains('harddrive')
      cy.get('.p-multiselect-panel').contains('sensor')
    })
  })

describe('Checks the filtering works for Harddrives', () => {
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

describe('Checks the filtering works for Sensor', () => {
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

describe('Looks at serial number options', () => {
  it('Looks at serial number options', () => {
    cy.visit('http://localhost:3001/history')
    cy.request('http://localhost:9090/api/v1/label/serial_number/values').then(
      (response) => {
          cy.log(response.body)
          cy.wait(10000)
          cy.get('.p-multiselect').contains('Serial number').click({ multiple: true })
          cy.get('.p-multiselect-items > li').each((item) => {
              expect(response.body.data).to.contain(item.children('span').eq(0).text())
          })
      }
    )
  })
})
 
describe('Checks filtering works for all serial numbers', () => {
    it('Checks filtering works for all serial numbers', () => {
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

// Sorting tests

describe('Prediction sorting test ascending', () => {
  it('Checks that sorting predictions works', () => {
    cy.visit('http://localhost:3001/history')
    cy.wait(10000)
    cy.get('input[id="PredictionSort"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Lowest to highest').click()
    cy.wait(3000)
    var prevVal = 0
    cy.get('.infinite-scroll-component > li').each((item) => {
      var curVal = parseInt(item.find('[data-testid="percentage"]').text().slice(0,-1))
      cy.wrap(curVal).should('be.gte', prevVal)
      prevVal = curVal
    })
  })
})

describe('Prediction sorting test descending', () => {
  it('Checks that sorting predictions works', () => {
    cy.visit('http://localhost:3001/history')
    cy.wait(10000)
    cy.get('input[id="PredictionSort"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Highest to lowest').click()
    cy.wait(3000)
    var prevVal = 100
    cy.get('.infinite-scroll-component > li').each((item) => {
      var curVal = parseInt(item.find('[data-testid="percentage"]').text().slice(0,-1))
      cy.wrap(curVal).should('be.lte', prevVal)
      prevVal = curVal
    })
  })
})

describe('Date sorting test ascending', () => {
  it('Checks that sorting predictions works', () => {
    cy.visit('http://localhost:3001/history')
    cy.wait(10000)
    cy.get('input[id="DateSort"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Oldest to newest').click()
    cy.wait(3000)
    var prevVal = 0
    cy.get('.infinite-scroll-component > li').each((item) => {
      var curVal = Date.parse(item.find('[data-testid="date"]').text())
      console.log(curVal)
      cy.wrap(curVal).should('be.gte', prevVal)
      prevVal = curVal
    })
  })
})

describe('Date sorting test descending', () => {
  it('Checks that sorting predictions works', () => {
    cy.visit('http://localhost:3001/history')
    cy.wait(10000)
    cy.get('input[id="DateSort"]').parent().parent().click()
    cy.get('ul[class="p-dropdown-items"]').contains('Newest to oldest').click()
    cy.wait(3000)
    var prevVal = Infinity
    cy.get('.infinite-scroll-component > li').each((item) => {
      var curVal = Date.parse(item.find('[data-testid="date"]').text())
      cy.wrap(curVal).should('be.lte', prevVal)
      prevVal = curVal
    })
  })
})

// Tests the feedback button

describe('Feedback button test', () => {
  it('Tests that the feedback exists and can be clicked', () => {
      cy.visit('http://localhost:3001/history')
      cy.wait(10000)
      cy.get('[data-testid="feedback-button"]').first().click()
  })
})

describe('Database query test', () => {
  it('Tests if database was updated after feedback button was clicked', () => {
    cy.visit('http://localhost:3001/history')
    cy.wait(10000)
    cy.get('[data-testid="feedback-button"]').first().click()
    cy.wait(3000)
    // Create a new PostgreSQL client
    cy.task('connectDB', 'SELECT COUNT(*) FROM prediction_feedback').then( (res) => {
      const count = parseInt(res[0].count)
      cy.wrap(count).should('be.gt', 0)
    })
  });
});