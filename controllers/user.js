const User = require("../models/User");
const Flow = require("../models/Flow");

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
    let stringFields = ['event_type', 'src_ip', 'dest_ip', 'proto', 'app_proto'];

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
  
};