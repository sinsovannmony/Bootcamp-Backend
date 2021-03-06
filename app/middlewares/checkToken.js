const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'Authorize! No token providerer' });
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decoded;
    next();
  } 
  catch (error) {
    return res.status(401).json({message: error.message});
  }
};
