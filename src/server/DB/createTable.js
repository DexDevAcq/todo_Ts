const { Client } = require('pg');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('./consts');


const client = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});


const table = `
    CREATE TABLE  "todo" (
        "id" SERIAL,
        "text" VARCHAR(100) NOT NULL,
        "completed" BOOLEAN NOT NULL,
        PRIMARY KEY ("id")
    );
`



const createDatabase = async (query) => {
    try {
        await client.connect();
        await client.query(query);
    } catch (error) {
        console.log(error);
        return false
    } finally {
        await client.end();
    }
}


createDatabase(table).then((result) => {
    console.log('Table has been created');
})