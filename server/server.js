const express = require("express");
const app = express();

const cors = require("cors");

const records = require("./routes/record.js");
const departments = require("./routes/department.js");

const PORT = process.env.PORT || 5050;

const corsOptions = {
  origin: "*",
  preflightContinue: true,
  methods: "GET, HEAD, PUT, PATCH",
  credentials: true,
  optionSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/record", records);
app.use("/department", departments);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
