const jwt = require("jsonwebtoken");
function createToken(userData) {
  const payload = {
    email: userData.email,
    _id: userData._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { createToken, verifyToken };
