const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Expect the token in Authorization header as "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 401 means 'authentication required' in a response
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = userPayload;  // e.g. { id: user._id, iat, exp }
    // iat means the token's issued-at time, exp means expiration time
    next();
  });
}

module.exports = authenticateToken;