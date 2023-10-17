const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json())

// 0TC2zduR3ASj24jq
// automotiveCarHant


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l9mlnno.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db('carhantDB').collection('user');
        const carCollection = client.db('carhantDB').collection('car')



       

        // for user collection

        app.get('/user', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })


        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    // console.log("server is running");
    res.send('server is runnig')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})