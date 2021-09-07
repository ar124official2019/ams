const express = require("express");
const passport = require('passport');
const Attendance = require("../models/attendance");
const AttendanceRouter = express.Router();
const { AppError } = require("../config/app");
const Student = require("../models/student");
const {
  startOfMonth,
  isValid,
  compareAsc,
  startOfTomorrow,
  endOfToday,
  formatISO,
  endOfMonth,
} = require("date-fns");

/**
 * Update an attendane entry
 */
AttendanceRouter.put(
  "/",
  passport.authenticate("cookie", { session: false }),
  async (req, res, next) => {
    try {
      const body = req.body;
      const tomorrow = startOfTomorrow();
      const date = new Date(body.date);
      const student = await Student.findOne({
        id: body.student,
      });

      const data = {
        student: student ? String(student._id) : "",
        date,
      };

      if (
        !data.student ||
        !isValid(data.date) ||
        compareAsc(data.date, tomorrow) != -1
      ) {
        throw AppError.from({
          code: 400,
          message: "Please specify both student and a valid date!",
        });
      }

      let attendance = await Attendance.findOne(data); // delete if exists
      if (attendance) {
        await attendance.remove();
        attendance = null;
      } else {
        // didn't exists, so create!
        attendance = await Attendance.create(data);
      }

      res.json(attendance);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Get attendance of this month
 */
AttendanceRouter.get(
  "/",
  async (req, res, next) => {
    try {
      const startDate = startOfMonth(new Date());
      const endDate = endOfToday();

      const entries = await Attendance.find({
        date: {
          $gte: formatISO(startDate),
          $lte: formatISO(endDate),
        },
      }).sort({ date: 1 });

      res.json({
        monthStart: startDate.getDate(),
        monthEnd: endOfMonth(startDate).getDate(),
        entries
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = AttendanceRouter;
