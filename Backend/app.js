const express =require('express');
const cors = require('cors');
const todoRoutes =require('./Routes/todoRoutes');
const app =express ();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
app.use('/api', todoRoutes);

module.exports = app;