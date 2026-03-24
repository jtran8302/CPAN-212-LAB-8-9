import { policyRepository } from "../repositories/policyRepository.js";

export const policyService = {
  listAll() {
    return policyRepository.findAll();
  },

  listForCustomer(customerId) {
    return policyRepository.findByCustomerId(customerId);
  },

  create(payload) {
    return policyRepository.create(payload);
  }
};