const { getUser } = require("../services/user");

const getTips = async (req, res) => {
    try {
        const user = await getUser(req.user);
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const tips = await getTipsBasedOnGoalsTracker(req.user);
        return res.status(200).json(tips);
    } catch (error) {
        return res.error(error);
    }
}

module.exports = {
    getTips
}

