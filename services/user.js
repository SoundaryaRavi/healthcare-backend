const User = require('../models/index');

export const getUser = async (id) => {
    try {
      return await User.findOne({ id: id });
    }
    catch (error) {
        throw error;
    }
}