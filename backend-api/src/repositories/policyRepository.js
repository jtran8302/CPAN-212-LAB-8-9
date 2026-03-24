import { Policy } from "../models/Policy.js";

export const policyRepository = {
  findAll() {
    return Policy.find().sort({ createdAt: -1 });
  },
  findById(id) {
    return Policy.findById(id);
  },
  findByCustomerId(customerId) {
    return Policy.find({ customer: customerId }).sort({ createdAt: -1 });
  },
  create(payload) {
    return Policy.create(payload);
  }
};