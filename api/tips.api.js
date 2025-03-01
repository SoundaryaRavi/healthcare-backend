const { getTodayGoalTrackerforUser } = require("./goalTracker.api");

const getTipsBasedOnGoalsTracker = async (userId) => {
    try {
        const userGoalsTracker = await getTodayGoalTrackerforUser(userId);
        if (userGoalsTracker) {
            let laggingCategory;
            // get the lagging category 
            // based on it get the tips 
            // if there is no lagging, take a random tips
        }
        else {
            // if there is no goal, take a random tips
        }
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getTipsBasedOnGoalsTracker }