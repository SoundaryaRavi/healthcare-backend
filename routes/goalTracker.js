const express = require('express');
const router = express.Router();

const { addGoal, getTodayGoalTrackerforUser } = require('../controllers/goalTracker.controller');

router.post("/", addGoal);
router.get("/", getTodayGoalTrackerforUser);

module.exports = router;