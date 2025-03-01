const User = require('../models/index');

const getUser = async (id) => {
    try {
      return await User.findOne({ id: id });
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
  getUser: getUser
}