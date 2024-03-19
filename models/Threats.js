const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    timestamp : String,
    ruleID : String,
    message : String,
    classification : String,
    severity : String,
    protocol : String,
    src_IP : String,
    dest_IP : String
  }, { collection: 'threats' } // Explicitly setting the collection name
);


module.exports = mongoose.model("Threat", dataSchema);

