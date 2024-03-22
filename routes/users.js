const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getTraffics,
  getThreats,
  getProfile,
  updateProfile,
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
router.get("/traffic", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/traffic.html'));
});

// get threats page
router.get("/threats", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/threats.html'));
});

// get createAccount page
router.get("/createAccount", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/createAccount.html'));
});

// get login page
router.get("/login", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/login.html'));
});

// get login page
router.get("/profile", function(req,res) {
  res.sendFile(path.join(__dirname, '../frontends/profile.html'));
});

// update a user
router.post('/updateProfile', updateProfile);

// get profile
router.get("/getProfile/:user_id", getProfile);

// get all threats
router.get("/getThreats", getThreats);

// get all traffic
router.get("/getTraffics", getTraffics);

// create a user
router.post("/createUser", createUser);

// get all users
router.get("/getUsers", getUsers);

// user login
router.post("/getUser", getUser);

// update a user
router.put("/updateUser/:id", updateUser);

// delete a user
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
