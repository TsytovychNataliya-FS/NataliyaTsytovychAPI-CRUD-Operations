const express = require("express");
const app = express();
const router = require("./routes/index");

app.use(express.json());

//localhost:300/api/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "GET to API",
    data: dataStore,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

app.use("/api", router); // Use the router for "/api" routes

module.exports = app;
