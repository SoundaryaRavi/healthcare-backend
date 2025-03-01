const GoalTracker = require("../models/goalTracker");

export const addGoalApi = async (data, userId) => {
    try {
        return await GoalTracker.create({
            userId: userId,
            activityName: data.activityName,
            activityValue: data.activityValue
        });
    }
    catch (error) {
        throw error;
    }
}

export const getTodayGoalTrackerforUser = async (userId) => {
    try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 
    
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999); 
    return await GoalTracker.aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(userId),
            date: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $group: {
            _id: "$activityName", // Group by the activityName field
            totalActivityValue: { $sum: "$activityValue" }, // Sum the corresponding activityValue
          },
        },
        {
          $project: {
            activityName: "$_id",
            totalActivityValue: 1,
            _id: 0
          },
        },
      ]);
    }
    catch (error) {
        throw error;
    }
}
