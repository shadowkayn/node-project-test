const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 18,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  // 软删除
  isDeleted: {
    type: Boolean,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
