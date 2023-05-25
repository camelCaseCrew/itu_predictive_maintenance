const { defineConfig } = require("cypress");
const { Client } = require('pg')

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "postgres",
            password: "postgres",
            host: "localhost",
            database: "postgres",
            ssl: false,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
  },
  "chromeWebSecurity": false
});
