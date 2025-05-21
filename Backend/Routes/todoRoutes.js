const express = require('express');
const router =express.Router();
const {
      getTodos,
  addTodo,
  deleteTodo,
  updateTodo
} =require ('../Controllers/todoController')

const { summarizeAndSend } = require('../Controllers/SummarizeController');

router.get('/todos',getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/summarize', summarizeAndSend);
router.put('/todos/:id', updateTodo);
module.exports = router;