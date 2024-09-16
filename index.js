require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403);
    res.send("Error: token CSRF inválido o ausente.");
  } else {
    next(err);
  }
});

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
