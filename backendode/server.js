
const url ='mongodb+srv://deniss:Denis2003@polupoker.sqtipna.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
// const url = require("./certificate/mongo_config");

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const credentials = "./certificate/X509-cert-8090361048139362480.pem";
const app = express();
const port = 8000;
// const client = new MongoClient(url, {
//     tls: true,
//     tlsCertificateKeyFile: credentials,
//     tlsCAFile: credentials, // Или укажите путь к корневому сертификату CA, если это необходимо
// });

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.post('/api/participants', async (req, res) => {
    try {
        const participant = req.body;
        const collection = client.db('admin').collection('participants');
        const result = await collection.insertOne(participant);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error inserting participant:', err);
        res.status(500).send('Error inserting participant');
    }
});

async function startServer() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}

startServer();