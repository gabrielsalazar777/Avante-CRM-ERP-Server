const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

const isAuthenticated = require("../middleware/isAuthenticated");

//CREATE
router.post("/create", isAuthenticated, (req, res) => {
  Client.create(req.body)
    .then((createdClient) => {
      console.log("CLIENT CREATED: ", createdClient);
      res.json(createdClient);
    })
    .catch((err) => {
      console.log(err);
    });
});

//READ ALL
router.get("/display", isAuthenticated, (req, res) => {
  Client.find()
    .then((foundClients) => {
      console.log("FOUND ALL CLIENTSS: ", foundClients);
      res.json(foundClients);
    })
    .catch((err) => {
      console.log(err);
    });
});

//READ ONE
router.get("/display/:clientId", isAuthenticated, (req, res) => {
  Client.findById(req.params.clientId)
    .then((foundClient) => {
      console.log("FOUND ONE Client: ", foundClient);
      res.json(foundClient);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE ONE
router.post("/edit/:clientId", isAuthenticated, (req, res) => {
  Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true })
    .then((updatedClient) => {
      res.json(updatedClient);
      console.log("EDIT: ", updatedClient);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE ONE
router.get("/delete/:clientId", isAuthenticated, (req, res) => {
  Client.findByIdAndDelete(req.params.clientId)
    .then((deletedResult) => {
      res.json(deletedResult);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
