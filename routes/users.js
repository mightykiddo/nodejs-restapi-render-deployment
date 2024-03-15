const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getMain
} = require("../controllers/user");


const router = express.Router();

app.get('/', function(req,res) {
  res.sendfile('index.html');
});

// get main page
router.get("/", getMain);

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
