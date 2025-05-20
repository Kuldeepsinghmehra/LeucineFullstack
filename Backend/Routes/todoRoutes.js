const express = require('express');
const router =express.Router();
const {
      getTodos,
  addTodo,
  deleteTodo
} =require ('../Controllers/todoController')

const { summarizeAndSend } = require('../Controllers/SummarizeController');

router.get('/todos',getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/summarize', summarizeAndSend);
module.exports = router;