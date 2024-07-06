const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Creating new user with email " + email + ", name " + name);
    const user = new User({ name, email, password: bcrypt.hashSync(password, 10) });
    console.log("User object created successfully");
    await user.save();
    const token = jwt.sign({ id: user._id }, config.get("JWT_SECRET"), { expiresIn: '1h' });
    res.status(201).json({ message: 'Account created successfully', token: token });
  } catch (error) {
    console.log("There was an error: " + error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login for email " + email);
    const user = await User.findOne({ email });
    console.log("User found: " + user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("Invalid credentials or user not found for email " + email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log("Creating token with id: " + user._id);
    console.log("JWT_SECRET is " + config.get("JWT_SECRET"));
    const token = jwt.sign({ id: user._id }, config.get("JWT_SECRET"), { expiresIn: '1h' });
    console.log("Login for user with email " + email + " was successful");
    res.status(200).json({ token: token });
  } catch (error) {
    console.log("There was an error: " + error);
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deposit = async (req, res) => {
  const { amount } = req.body;
  console.log("Depositing amount: " + amount);
  try {
    const user = await User.findById(req.user.id);
    console.log("User found: " + user);
    user.balance += amount;
    await user.save();
    console.log("User saved successfully");
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  console.log("Withdrawing amount: " + amount);
  try {
    const user = await User.findById(req.user.id);
    console.log("User found: " + user);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    user.balance -= amount;
    await user.save();
    console.log("User saved successfully");
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("User found: " + user);
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createAccount, login, getProfile, deposit, withdraw, getBalance };
