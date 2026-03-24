export interface AmendmentRequest {
  _id: string;
  policyId: string;
  requestedBy: string;
  requestType: string;
  currentValue?: string;
  requestedValue: string;
  reason: string;
  status: string;
  reviewedBy?: string;
  reviewComment?: string;
  createdAt?: string;
  updatedAt?: string;
}