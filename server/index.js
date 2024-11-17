require('dotenv').config(); //to get MongoDB URI of a cluster from .env file saved locally in the `server` dir
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const app = express();
const port = 5000;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //connecting to DB or creating one if it doesnt exist already.
    const database = client.db("erino");
    const databaseCollection = database.collection("contacts");

    app.use(cors());
    app.use(express.json());

    //Function to post data in the database
    app.post("/contacts", async (req, res) => {
      const data = req.body;
      const doc = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phonenumber: data.phoneNumber,
        company: data.company,
        jobtitle: data.jobTitle,
      };
      console.log("Received Contact:", doc);
      const result = await databaseCollection.insertOne(doc);
      res.send(result);
      console.log("Insert Result:", result);
    });
    //Function to get all data from DB
    app.get("/contacts", async (req, res) => {
      try {
        const data = await databaseCollection.find().toArray(); 
        res.json(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).send("Error fetching contacts");
      }
    });
    
//Deleting data from the DB
app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const objectId = new ObjectId(id);
    const result = await databaseCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});
//Getting one specific data/ contact from the DB
app.get("/contacts/:id", async (req, res) => {
  const id = req.params;
    try{
      const query = { _id: new ObjectId(id) };
      const user = await databaseCollection.findOne(query);
      res.send(user);
  }
  catch(error){
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});
//For updating a contact
app.put("/contacts/:id", async (req, res) => {
  const data = req.body;
  const paramsId = req.params.id;
  console.log(paramsId);
  
  if (!ObjectId.isValid(paramsId)) {
    return res.status(400).send({ error: "Invalid contact ID format" });
  }

  const filter = { _id: new ObjectId(paramsId) }; 
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phonenumber: data.phonenumber,
      company: data.company,
      jobtitle: data.jobtitle,
    },
  };

  try {
    const result = await databaseCollection.updateOne(filter, updateDoc, options);
    res.send(result); 
    console.log("ID from params:", paramsId);

  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).send({ error: "Failed to update contact" });
  }
});
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});
