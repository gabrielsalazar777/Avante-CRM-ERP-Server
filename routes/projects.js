const express = require("express");
const router = express.Router();

const Project = require("../models/Project");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/display", isAuthenticated, (req, res) => {
  Project.find()
    .then((foundProjects) => {
      console.log("FOUND PROJECTS: ", foundProjects);
      res.json(foundProjects);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", isAuthenticated, (req, res) => {
  Project.create(req.body)
    .then((createdProject) => {
      console.log("PROJECT CREATED: ", createdProject);
      res.json(createdProject);
    })
    .catch((err) => {
      console.log(err);
    });
});

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
