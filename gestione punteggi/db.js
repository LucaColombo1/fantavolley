const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://fantavolley_user:password@cluster0.mongodb.net/fantavolley?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connesso a MongoDB!");

        // Esempio: Inserimento in una collezione
        const database = client.db('fantavolley');
        const collection = database.collection('utenti');

        const result = await collection.insertOne({ nome: "Luca", ruolo: "Giocatore" });
        console.log(`Inserito documento con ID: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
