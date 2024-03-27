const express = require("express");

// This will help us connect to the database
const connectToMongoDB = require("../db/connection.js");

// This helps convert the id from string to ObjectId for the _id.
const { ObjectId } = require("mongodb");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the employ_info.
router.get("/", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  let collection = await db.collection("employ_info");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  let collection = await db.collection("employ_info");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  try {
    let newDocument = {
      name: req.body.name,
      hire_date: req.body.hire_date,
      position: req.body.position,
      department: req.body.department,
    };
    let collection = await db.collection("employ_info");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        hire_date: req.body.hire_date,
        position: req.body.position,
        department: req.body.department,
      },
    };

    let collection = await db.collection("employ_info");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("employ_info");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

module.exports = router;