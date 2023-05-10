import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from 'pg';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const client = new Client({
        host: "db", // The name of the Docker container running the database
        port: 5432, // The default PostgreSQL port
        user: "postgres", // The username for the database
        password: "postgres", // The password for the database user
        database: "postgres", // The name of the database to connect to
    });
    await client.connect()
    const id = req.query.id as string
    const query = {
        text: 'INSERT INTO prediction_feedback (SELECT * FROM hard_drive_stats WHERE id = $1)',
        values: [id]
    }
    client.query(query, (err, result) => {
        if (err) {
          console.error(err);
          res.json(-1)
        } else {
          console.log('Data inserted successfully!');
          res.json(0)
        }
        
        // disconnect the client when finished
        client.end();
    });
}