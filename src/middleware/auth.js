const jwt = require("jsonwebtoken");

const authCheck = function (req, res, next) {
  try {
    const headerTokan = req.headers["x-auth-token"];
    if (!headerTokan) {
      return res
        .status(400)
        .send({ status: false, msg: "header must be included" });
    }
    let decoded = jwt.verify(headerTokan, "secret-key");
    if (!decoded) {
      return res.status(401).send({ status: false, msg: "tokan is invalid" });
    }
    req.decodeToken = decoded;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, err: error.message });
  }
};
module.exports.Authencheck = authCheck;

const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
try{
  if (req.decodeToken.userId != req.params.userId) {
    return res.status(403).send({ status: false, message: "you are not authorised" });
  }
  next();
}
catch (error) {
    return res.status(500).send({ status: false, err: error.message });
  }
};
module.exports.authorise = authorise;
