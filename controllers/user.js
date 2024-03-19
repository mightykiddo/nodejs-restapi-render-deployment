const User = require("../models/User");
const Flow = require("../models/Flow");
const Threat = require("../models/Threats");
const moment = require('moment');

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400);
      return next(new Error("name & email fields are required"));
    }

    // check if user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.status(404);
      return next(new Error("User already exists"));
    }

    const user = await User.create({
      name, email
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users)
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// const getTraffics = async (req, res, next) => {
//   try {
//     const flow = await Flow.find().sort({ timestamp: -1 }); // Sort by timestamp in descending order
//     console.log(flow)

//     res.status(200).json({
//       success: true,
//       flow,
//     });
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
// };


const getTraffics = async (req, res, next) => {
  try {
    let query = {}; // Initialize an empty query object
    let numericFields = ['flow_id', 'src_port', 'dest_port'];
    let stringFields = ['event_type', 'src_ip', 'dest_ip', 'proto', 'app_proto', 'timestamp'];

    // Check if search keyword is provided in the request
    if (req.query.search) {
      const keyword = req.query.search.toString();
      let numericQuery = [];
      let stringQuery = [];

      // Use regex to perform a case-insensitive search across multiple fields
      for (let field of numericFields) {
        if (!isNaN(keyword)) {
          numericQuery.push({ [field]: Number(keyword) });
        }
      }

      for (let field of stringFields) {
        stringQuery.push({ [field]: { $regex: keyword, $options: 'i' } });
      }

      // Check if the keyword is a date or a timestamp
      if (!isNaN(Date.parse(keyword))) {
        // Convert the keyword to a Date object
        let date = new Date(keyword);
        // Create a range for the timestamp
        let start = new Date(date);
        let end = new Date(date);
        if (keyword.length === 10) { // If the keyword is a date
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
        } else { // If the keyword is a timestamp
          start.setSeconds(start.getSeconds() );
          end.setSeconds(end.getSeconds() + 1);
        }
        // Convert the date range back to the original timestamp format
        let startTimestamp = moment.utc(start).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        let endTimestamp = moment.utc(end).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        console.log(startTimestamp, endTimestamp)
        // Add the timestamp range to the query
        stringQuery.push({ timestamp: { $gte: startTimestamp, $lte: endTimestamp } });
      }

      query.$or = [...numericQuery, ...stringQuery];
    }

    // // Check if event type is provided in the request
    // if (req.query.eventType) {
    //   query.event_type = req.query.eventType;
    // }

    // // Check if protocol is provided in the request
    // if (req.query.protocol) {
    //   query.proto = req.query.protocol;
    // }

    const flows = await Flow.find(query).sort({ timestamp: -1 }); // Apply the query and sort by timestamp
    console.log(flows);

    res.status(200).json({
      success: true,
      flow: flows,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getThreats = async (req, res, next) => {
  try {
    let query = {}; // Initialize an empty query object
    let stringFields = ['timestamp', 'ruleID', 'message', 'classification', 'severity', 'protocol', 'src_IP', 'dest_IP'];

    // Check if search keyword is provided in the request
    if (req.query.search) {
      const keyword = req.query.search.toString();
      
      let stringQuery = [];

      for (let field of stringFields) {
        stringQuery.push({ [field]: { $regex: keyword, $options: 'i' } });
      }

      // Check if the keyword is a date or a timestamp
      if (!isNaN(Date.parse(keyword))) {
        // Convert the keyword to a Date object
        let date = new Date(keyword);
        // Create a range for the timestamp
        let start = new Date(date);
        let end = new Date(date);
        if (keyword.length === 10) { // If the keyword is a date
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
        } else { // If the keyword is a timestamp
          start.setSeconds(start.getSeconds() );
          end.setSeconds(end.getSeconds() + 1);
        }
        // Convert the date range back to the original timestamp format
        let startTimestamp = moment.utc(start).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        let endTimestamp = moment.utc(end).add(8, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        console.log(startTimestamp, endTimestamp)
        // Add the timestamp range to the query
        stringQuery.push({ timestamp: { $gte: startTimestamp, $lte: endTimestamp } });
      }

      query.$or = [...stringQuery];
    }

    const threats = await Threat.find(query).sort({ timestamp: -1 }); // Apply the query and sort by timestamp
    console.log(threats);

    res.status(200).json({
      success: true,
      threats: threats,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getTraffics,
  getThreats,
};
