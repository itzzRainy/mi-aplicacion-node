const auth = require("basic-auth");

function checkAuth(req, res, next) {
  const user = auth(req);
  const authorizedUser = {
    name: "admin",
    pass: "password123",
  };

  if (
    !user ||
    user.name !== authorizedUser.name ||
    user.pass !== authorizedUser.pass
  ) {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Autenticación requerida.");
  }

  next();
}

module.exports = checkAuth;
