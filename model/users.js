const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

// const updateAvatar = async (id, avatar) => {
//   return await User.updateOne({ _id: id }, { avatarURL: avatar });
// };

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
