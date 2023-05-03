const jwt = require('jsonwebtoken');


const withAuth = function(req, res, next) {
  let bearer = JSON.stringify(req.headers.authorization.split(" ")[0])
  let token = JSON.stringify(req.headers.authorization.split(" ")[1])
  if(!bearer || !token){
    res.status(401).send('Unauthorized');
  }
   else {
    jwt.verify(token.replace(/"|'/g, ''), process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;