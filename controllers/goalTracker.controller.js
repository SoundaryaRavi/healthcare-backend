const { addGoalApi } = require('../api/goalTracker.api');
const { getUser } = require("../services/user");

const addGoal = async (req, res) => {
    try {
        // Input validation
        if (!req.user && !req.body.activityName && !req.body.activityValue) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        const user = await getUser(req.user);
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const goal = await addGoalApi(req.body, req.user);
        return res.status(201).json(goal);
    }
    catch (error) {
        return res.error(error);
    }
}

const getTodayGoalTrackerforUser = async (req, res) => {
    try {
        const user = await getUser(req.user);
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const todayGoals = await getTodayGoalTrackerforUser(req.user);
        return res.status(200).json(todayGoals);
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
   addGoal, getTodayGoalTrackerforUser
}