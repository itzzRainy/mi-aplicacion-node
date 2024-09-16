const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

let todos = [];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post(
  "/",
  body("title").notEmpty().withMessage("El título es requerido"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
);

router.put(
  "/:id",
  body("title").notEmpty().withMessage("El título es requerido"),
  (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    todo.title = req.body.title;
    todo.completed = req.body.completed || false;
    res.json(todo);
  }
);

router.delete("/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
