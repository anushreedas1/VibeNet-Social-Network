const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string'; // Replace with your actual connection string
const client = new MongoClient(uri);

let db;

async function connectToMongoDB() {
    await client.connect();
    db = client.db('your_database_name'); // Replace with your actual database name
}

function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToMongoDB first.');
    }
    return db;
}

module.exports = { connectToMongoDB, getDatabase, db }; // Add db here
