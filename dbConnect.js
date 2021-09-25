require("dotenv").config();
const { Client } = require('pg');

async function insertUsers(username, number_of_greetings){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `INSERT INTO users (username, number_of_greetings)
        VALUES ('${username}', ${number_of_greetings})
        `;
        try {
            await client.connect();
            console.log(query);
            client.query(query, async (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Data saved successful');
                await client.end();
            });
        } catch (error) {
            console.log(error);
        }
        
}
async function getUsers(){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `SELECT * FROM users`;
    await client.connect();
    
    var results = await client.query(query);
    await client.end();
    return results;
}

async function getUser(username){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `SELECT * FROM users WHERE username='${username}'`;
    await client.connect();
    
    var results = await client.query(query);
    await client.end();
    return results;
}
async function deleteUsers(){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `DELETE FROM users WHERE users.id >= 1`;
    try {
        await client.connect();
        client.query(query, async (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data deleted successful');
            await client.end();
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateUserCounter(username, number_of_greetings){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `UPDATE users
    SET number_of_greetings = ${number_of_greetings}
    WHERE username = '${username}'`;
    await client.connect();
    try {
        //await client.connect();
        client.query(query, async (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data updated successful');
            await client.end();
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateCounter(){
    const client = new Client({
        user: "postgres",
        password: "db12345",
        host: "localhost",
        port: 5432,
        database: "greetings"
    });
    const query = `UPDATE users
    SET counter = 0
    WHERE users.id < 1`;

    try {
        await client.connect();
        client.query(query, async (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data updated successful');
            await client.end();
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = { insertUsers, getUsers, deleteUsers , updateCounter, getUser, updateUserCounter};