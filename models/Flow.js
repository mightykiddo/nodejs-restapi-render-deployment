const mongoose = require("mongoose");

const flowSchema = new mongoose.Schema(
  {
    pkts_toserver: Number,
    pkts_toclient: Number,
    bytes_toserver: Number,
    bytes_toclient: Number,
    start: String,
    end: String,
    age: Number,
    state: String,
    reason: String,
    alerted: Boolean,
  }
);

const tcpSchema = new mongoose.Schema(
  {
    tcp_flags: String,
    tcp_flags_ts: String,
    tcp_flags_tc: String,
  }
);

const dataSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: String,
    flow_id: Number,
    in_iface: String,
    event_type: String,
    src_ip: String,
    src_port: Number,
    dest_ip: String,
    dest_port: Number,
    proto: String,
    flow: flowSchema,
    tcp: tcpSchema,
  }, { collection: 'flow' } // Explicitly setting the collection name
);


module.exports = mongoose.model("Flow", dataSchema);

