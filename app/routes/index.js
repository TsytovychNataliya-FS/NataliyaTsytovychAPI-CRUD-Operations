const express = require("express");
const router = express.Router();

// In-memory data storage
let dataStore = [
  // Sample data
  { id: 1, message: "Sample message 1" },
  { id: 2, message: "Sample message 2" },
];

// GET all
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET to API",
    data: dataStore,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// GET by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const item = dataStore.find((d) => d.id === parseInt(id));
  if (item) {
    res.status(200).json({
      message: "GET by Id for /api",
      data: item,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({
      message: "Item not found",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

// POST
router.post("/", (req, res) => {
  const { message } = req.body;
  const newItem = {
    id: dataStore.length ? dataStore[dataStore.length - 1].id + 1 : 1,
    message,
  };
  dataStore.push(newItem);
  res.status(201).json({
    message: "POST to /api",
    data: newItem,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// PUT or PATCH by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const index = dataStore.findIndex((d) => d.id === parseInt(id));
  if (index !== -1) {
    dataStore[index].message = message;
    res.status(200).json({
      message: "PUT to /api",
      data: dataStore[index],
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({
      message: "Item not found",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

// DELETE by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = dataStore.findIndex((d) => d.id === parseInt(id));
  if (index !== -1) {
    dataStore.splice(index, 1);
    res.status(204).end(); // No content to send back
  } else {
    res.status(404).json({
      message: "Item not found",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

module.exports = router;
