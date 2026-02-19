import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadOnCloud } from "../Utils/cloudinary.js";
import fs from 'fs';


const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(userExist._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const register_user = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;
  const profileLocalPath = req.file ? req.file.path : null;

  try {
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Email is not valid" });
    }

    // Check if user already exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    let cloudinaryResponse = null;

    if (profileLocalPath) {
      try {
        cloudinaryResponse = await uploadOnCloud(profileLocalPath);
        fs.unlinkSync(profileLocalPath);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ success: false, message: "Error uploading profile picture", error: error.message });
      }
    }

    // Create new user
    const newUser = new userModel({
      email,
      password: hashed_password,
      firstName: firstName,
      lastName: lastName,
      profile_picture: cloudinaryResponse ? cloudinaryResponse.url : null,
      bio: '',
      interests: []
    });

    // Save the user to the database
    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Respond with success
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getOtherUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { userId, firstName, lastName, bio } = req.body;
  const profileLocalPath = req.file ? req.file.path : null;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;

    if (profileLocalPath) {
      try {
        const cloudinaryResponse = await uploadOnCloud(profileLocalPath);
        user.profile_picture = cloudinaryResponse.url;
        fs.unlinkSync(profileLocalPath);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      }
    }

    await user.save();
    const updatedUser = await userModel.findById(userId).select('-password');
    res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateUserInterests = async (req, res) => {
  const { userId } = req.params;
  const { interests } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(userId, { interests }, { new: true }).select('-password');
    res.status(200).json({ success: true, message: 'Interests updated successfully', user });
  } catch (error) {
    console.error('Error updating interests:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUserInterests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId).select('interests');
    res.status(200).json({ success: true, interests: user.interests });
  } catch (error) {
    console.error('Error getting interests:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export { login_user, register_user, getUserDetails, updateUserInterests, getUserInterests, getOtherUserInfo, updateProfile };