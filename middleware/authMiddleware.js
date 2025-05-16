const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

const authorizeAgent = (req, res, next) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Access denied: agents only' });
  }
  next();
};

module.exports = { protect, authorizeAgent };
