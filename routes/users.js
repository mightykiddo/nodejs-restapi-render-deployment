const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers
} = require("../controllers/user");


const router = express.Router();

const path = require('path');

// get landing page
router.get("/", function(req,res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// get main page
router.get("/mainpage", function(req,res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

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
