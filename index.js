const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();

// port declare 
const port = process.env.PORT || 5000;


//middleware 
app.use(cors());
app.use(express.json()); // body theke data parse korte lage 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jqkjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');

        app.get('/service' , async (req, res)=> {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {
        // Ensures that the client will close when you finish/error

        //await client.close();
    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('running genius-car server ');
})

app.listen(port, () => {
    console.log(`server is running port ${port}`);
})


