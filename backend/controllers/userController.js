import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
