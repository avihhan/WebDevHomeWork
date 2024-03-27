const express = require("express");

// This will help us connect to the database
const connectToMongoDB = require("../db/connection.js");

// This helps convert the id from string to ObjectId for the _id.
const { ObjectId } = require("mongodb");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get records by department
router.get("/", async (req, res) => {
  let db = await connectToMongoDB.connectToMongoDB();
  let collection = await db.collection("employ_info");
  let results = await collection.find({}).toArray();

  // Group records by department
  let groupedResults = {
    Management: [],
    IT: [],
    Sales: [],
  };

  results.forEach((employee) => {
    switch (employee.department) {
      case "Management":
        groupedResults.Management.push(employee);
        break;
      case "IT":
        groupedResults.IT.push(employee);
        break;
      case "Sales":
        groupedResults.Sales.push(employee);
        break;
      default:
        break;
    }
  });
  console.log(groupedResults);
  res.json(groupedResults).status(200);
});

module.exports = router;
