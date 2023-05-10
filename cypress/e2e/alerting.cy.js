import { v4 as uuidv4 } from 'uuid';

describe('Alert activated', () => {
    it('Checks that prometheus alerts have been activated', () => {
        cy.request('http://localhost:9090/api/v1/alerts')
        .its('status')
        .should('equal', 200)
    })
})

describe('Alert activated', () => {
    it('Checks that prometheus alerts have been activated', () => {
        cy.wait(10000)
        cy.request('https://api.mail.tm/domains').then(( response ) => {
            const accountName = uuidv4() + '@' + response.body["hydra:member"][0]["domain"]
            const password = "predictit123"

            cy.request('POST', 'https://api.mail.tm/accounts', { address: accountName, password: password})
            cy.request('PUT', 'http://localhost:5000/update/'+accountName)
            cy.request('POST', 'https://api.mail.tm/token', { address: accountName, password: password}).then(( response ) => {
                const token = response.body.token
                const id = response.body.id

                cy.request({
                    url: 'https://api.mail.tm/messages',
                    auth: token
                }).then((response) => {
                    expect(response.body["hydra:totalItems"]).to.be.greaterThan(0)
                })

                cy.request('DELETE', 'https://api.mail.tm/accounts/' + id)
            })

        })
    })
})