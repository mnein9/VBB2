const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

const auth = async (req, res, next) => {
  console.log("request headers are: " + JSON.stringify(req.headers));
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    console.log("Bearer token is " + token);
    console.log("decoding token");
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    console.log("decoded is: " + decoded.id);
    const user = await User.findById(decoded.id);
    console.log("User is " + user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;
