import httpStatus from "http-status";
import { User } from "../models/users/users.js";
import { response } from "express";

const getUsers = async (req, res) => {
  try {
    // query datbase using User model to retrieve all users and store them in a variable

    let users = await User.find({});

    // check if users exist in datbase
    if (users.length === 0 || !users) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No registered users!",
      });
    }

    //   retrieve all registered users if they exist

    res.status(httpStatus.OK).json({
      status: "Success",
      message: "Registered users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Internal Server Error",
      message: "An error occurred while retreiving users",
    });
  }
};

// get a single user from resgistered users
const getUser = async (req, res) => {
  const { id, email } = req.query;
  try {
    let user;
    if (id) {
      user = await User.findById(id);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: "Error",
          message: "User not found",
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: "success",
          message: "User details retrieved successfully",
          data: user,
        });
      }
    } else if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: "Error",
          message: "User not found",
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: "success",
          message: "User details retrieved successfully",
          data: user,
        });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid query type. Use 'id', 'email'.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// delete user from database
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: `User ${id} does not exist`,
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occured while deleting the user",
    });
  }
};
export { getUsers, getUser, deleteUser };
