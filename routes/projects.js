const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Client = require("../models/Client");

const isAuthenticated = require("../middleware/isAuthenticated");

//CREATE
router.post("/create", isAuthenticated, (req, res) => {
  Project.create(req.body)
    .then((createdProject) => {
      Project.findById(createdProject._id)
        .populate("client")
        .then((foundProject) => {
          console.log("PROJECT CREATED: ", foundProject);
          res.json(foundProject);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//READ ALL
router.get("/display", isAuthenticated, (req, res) => {
  Project.find()
    .populate("client")
    .then((foundProjects) => {
      console.log("FOUND ALL PROJECTS: ", foundProjects);
      res.json(foundProjects);
    })
    .catch((err) => {
      console.log(err);
    });
});

//READ ONE
router.get("/display/:projectId", isAuthenticated, (req, res) => {
  Project.findById(req.params.projectId)
    .populate("client")
    .then((foundProject) => {
      console.log("FOUND ONE PROJECTS: ", foundProject);
      res.json(foundProject);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE ONE
router.post("/edit/:projectId", isAuthenticated, (req, res) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .populate("client")
    .then((updatedProject) => {
      res.json(updatedProject);
      console.log("EDIT: ", updatedProject);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE ONE
router.get("/delete/:projectId", isAuthenticated, (req, res) => {
  Project.findByIdAndDelete(req.params.projectId)
    .then((deletedResult) => {
      res.json(deletedResult);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
