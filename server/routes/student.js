const express = require('express');
const Student = require('../models/student');
const StudentRouter = express.Router();

/**
 * Get students
 */
StudentRouter.get('/', async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

module.exports = StudentRouter;