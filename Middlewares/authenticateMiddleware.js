// // authenticateMiddleware.js
// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//   const token = req.headers['authorization']?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(403).json({ msg: "Access denied" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid Token" });
//     }
//     req.user = user;  // Attach decoded JWT (including role) to req.user
//     next();
//   });
// };

// module.exports = authenticateJWT;
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel"); // Import User model

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({ message: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isEnabled) {
      return res.status(403).json({ message: "disabled" }); // Send a clear "disabled" message
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateJWT;
