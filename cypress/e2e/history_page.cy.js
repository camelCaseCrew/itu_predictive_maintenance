import { Client } from 'pg';

// Tests the feedback button

describe('Feedback button test', () => {
    it('Tests that the feedback exists and can be clicked', () => {
        cy.visit('http://localhost:3001/history')
        cy.get('div[id="feedback-button"]').click()
    })
})

describe('Database query test', () => {
    it('Tests if database was updated after feedback button was clicked', () => {
      cy.visit('http://localhost:3001/history')
      cy.get('div[id="feedback-button"]').click()
      cy.wait(1000)
      // Create a new PostgreSQL client
      const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'postgres',
      });
  
      // Connect to the database
      client.connect();
  
      // Query the database
      client.query('SELECT COUNT(*) FROM my_table', (err, result) => {
        if (err) {
          throw err;
        }
        const count = result.rows[0].count;
        expect(count).to.be.above(0);
  
        // Close the database connection
        client.end();
      });
    });
  });