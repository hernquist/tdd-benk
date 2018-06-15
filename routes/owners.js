//routes/owners
const express = require("express");
const app = express();
const owner = require("../models/owner");

app.get("/", function(req, res, next) {
  owner.fetchAll().then(owners => 
    res.status(200).json(owners)
  );
});

app.get("/:id", function(req, res, next) {
  owner
    .where({ id: req.params.id })
    .fetch()
    .then(owner => 
      res.status(200).json(owner)
    );
});

module.exports = app;
