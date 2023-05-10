const dimensions = require('../dimensions.js')

describe('Subscribe button gives pop up', () => {
    Object.values(dimensions).map((key, i) => {
      it('Subscribe button gives pop up', () => {
        cy.viewport(key.viewportWidth, key.viewportHeight)
        cy.visit('http://localhost:3001')
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
        cy.visit('http://localhost:3001')
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
        cy.visit('http://localhost:3001')
        cy.get('#subscribe-id').click()
        cy.get('#textInput-id').type("a@cool.email")
        cy.contains("Please enter a valid Email address").should("not.exist")
        
        })
    })
})

describe('Add email api request', () => {
    it('alert manager update api request add email', () => {
      cy.request("put", "localhost:5000/update/a@cool.email").then((res) => {
        res.body.code.should("equal", 200)
      })
    })
})