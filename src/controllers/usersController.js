import httpStatus from "http-status";
import { User } from "../models/users/users.js";
import bcrypt from "bcrypt";
import { registerSchema } from "./../validation/usersValidation.js";
import jwt from "jsonwebtoken";

// Controller function for registering a user
const registerUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { fullname, gender, email, password, role, username, phone } = value;

  try {
    // Check if a user with the provided email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with email already exists",
      });
    }

    // Check if a user with the provided username already exists
    user = await User.findOne({ username: username });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      fullname,
      gender,
      email,
      password: hashedPassword,
      role,
      username,
      phone,
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "User registration successful",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while registering the user",
    });
  }
};

// updating of users details
const updateUser = async (req, res) => {
  try {
    const { email, password, fullname, gender, phone } = req.body;
    const { id } = req.params;

    // check if user exists using id
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }

    // check if the email entered already exists
    const emailExist = await User.findOne({ email });
    const nameExist = await User.findOne({ fullname });
    if (emailExist || nameExist) {
      return res.status(httpStatus.CONFLICT).json({
        status: "success",
        message: "Details entered already exist",
      });
    }

    // check if the password entered already exists

    // prepare the request body object
    const updateData = {};
    if (email) updateData.email = email;
    if (fullname) updateData.fullname = fullname;
    if (password) updateData.password = password;
    if (phone) updateData.phone = phone;
    if (gender) updateData.gender = gender;

    // create and return updatedUser
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      status: "success",
      message: "User details updated successfully",
      updatedData: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "SERVER ERROR",
    });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Invalid Login details",
      });
    }

    // check and compare password
    const correctPassword = await bcrypt.compare(password, userExists.password);
    if (!correctPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // create an authorization token for the user
    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Login Successful!",
      userData: {
        id: userExists._id,
        name: userExists.username,
        email: userExists.email,
      },
      authToken: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};

export { registerUser, updateUser, loginUser };
