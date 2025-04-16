const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    mobile: user.mobile
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};



module.exports = { generateToken };
