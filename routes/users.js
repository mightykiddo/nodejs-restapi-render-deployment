const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getTraffics
} = require("../controllers/user");


const router = express.Router();

const path = require('path');

// get landing page
router.get("/", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/landingpage.html'));
});

// get main page
router.get("/mainpage", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/mainpage.html'));
});

// get all users page
router.get("/users", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/users.html'));
});

// get traffic page
router.get("/trafficpage", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/traffic.html'));
});

// get all traffic
router.get("/getTraffics", getTraffics);

// create a user
router.post("/createUser", createUser);

// get all users
router.get("/getUsers", getUsers);

// get a user
router.get("/getUser/:id", getUser);

// update a user
router.put("/updateUser/:id", updateUser);

// delete a user
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
