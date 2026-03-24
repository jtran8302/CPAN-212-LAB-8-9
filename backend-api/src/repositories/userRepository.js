import { User } from "../models/User.js";

export const userRepository = {
  findByUsername(username) {
    return User.findOne({ username }).populate("roles");
  },

  findById(id) {
    return User.findById(id).populate("roles");
  },

  findAll() {
    return User.find().populate("roles");
  },

  create(data) {
    return User.create(data);
  },

  updateById(id, update) {
    return User.findByIdAndUpdate(id, update, { new: true }).populate("roles");
  }
};