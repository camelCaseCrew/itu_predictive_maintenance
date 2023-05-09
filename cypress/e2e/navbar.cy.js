const dimensions = require('../dimensions.js')

describe('Subscribe button gives pop up', () => {
    Object.values(dimensions).map((key, i) => {
      it('Subscribe button gives pop up', () => {
        cy.viewport(key.viewportWidth, key.viewportHeight)
        cy.visit('http://localhost:3003')
        cy.get('#subscribe-id').click()
        cy.contains('Subscribe to Email notifications:')
        
      })
    })
  })

//modal test

describe('Invalid email', () => {
    Object.values(dimensions).map((key, i) => {
      it('Shows error message when inserted invalid email', () => {
        cy.viewport(key.viewportWidth, key.viewportHeight)
        cy.visit('http://localhost:3003')
        cy.get('#subscribe-id').click()
        cy.get('#textInput-id').type("notAnEmail")
        cy.contains("Please enter a valid Email address")
        
      })
    })
  })

describe('Valid email', () => {
    Object.values(dimensions).map((key, i) => {
        it('Shows error message when inserted invalid email', () => {
        cy.viewport(key.viewportWidth, key.viewportHeight)
        cy.visit('http://localhost:3003')
        cy.get('#subscribe-id').click()
        cy.get('#textInput-id').type("a@cool.email")
        cy.contains("Please enter a valid Email address").should("not.exist")
        
        })
    })
})