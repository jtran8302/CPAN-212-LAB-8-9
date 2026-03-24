export interface Policy {
  _id: string;
  policyNumber: string;
  insuranceType: string;
  customerId: string;
  coverageAmount: number;
  premiumAmount: number;
  currency: string;
  effectiveDate: string;
  expiryDate: string;
  status: string;
  beneficiaryName?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  propertyAddress?: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}