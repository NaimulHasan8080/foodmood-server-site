const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsqce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("our uri", uri);



async function run() {
    try {
        await client.connect();
        console.log("connected to database")

        const database = client.db("myfoodmood");
        const userCollection = database.collection("user")

        //POST API
        app.post('/userService', async (req, res) => {
            const userData = req.body;
            const result = await userCollection.insertOne(userData);
            res.json(result)
        });


        //GET API full
        app.get('/userService', async (req, res) => {
            const cursor = servicesCollection.find({});
            const service = await cursor.toArray();
            res.json(service)
        })

        //GET Single API
        app.get('/userService/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.findOne(query);
            res.json(result)
        })


        // Update API
        app.put('/userService/:id', async (req, res) => {
            const id = req.params.id;
            const updateService = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    Name: updateService.Name,
                    price: updateService.price,
                    description: updateService.description,
                    img: updateService.img
                }
            }
            const result = await servicesCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })

        // DELETE API
        app.delete('/userService/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.deleteOne(query);
            res.json(service)
        })

    }
    finally {

    }

}

run().catch(console.dir);

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("foodMood");
//         const userCollection = database.collection("user");


//-----------------------------//


// //GET API full
// app.get('/userService', async (req, res) => {
//     const cursor = servicesCollection.find({});
//     const service = await cursor.toArray();
//     res.json(service)
// })

// //GET Single API
// app.get('/userService/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: ObjectId(id) };
//     const result = await servicesCollection.findOne(query);
//     res.json(result)
// })


//POST API
// app.post('/userService', async (req, res) => {
//     const userData = req.body;
//     const result = await servicesCollection.insertOne(userData);
//     res.json(result)
// });

//Update API
// app.put('/userService/:id', async (req, res) => {
//     const id = req.params.id;
//     const updateService = req.body;
//     const filter = { _id: ObjectId(id) };
//     const options = { upsert: true };
//     const updateDoc = {
//         $set: {
//             Name: updateService.Name,
//             price: updateService.price,
//             description: updateService.description,
//             img: updateService.img
//         }
//     }
//     const result = await servicesCollection.updateOne(filter, updateDoc, options);
//     res.json(result)
// })

//DELETE API
// app.delete('/userService/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: ObjectId(id) };
//     const service = await servicesCollection.deleteOne(query);
//     res.json(service)
// })



//-----------------------------//









//     } finally {
//         // await client.close();
//     }
// }
// run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("successfully connected server")
})

app.listen(port, () => {
    console.log("server start by port ", port)
})