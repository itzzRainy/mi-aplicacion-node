const express = require("express");
const checkAuth = require("../middlewares/auth");
const router = express.Router();
const todoRoutes = require("./todos");

router.get("/", (req, res) => {
  res.send("¡Bienvenido a la API segura de To-Dos!");
});

router.use("/todos", todoRoutes);

router.get("/protected", checkAuth, (req, res) => {
  res.send("Ruta protegida");
});

router.get("/form", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
