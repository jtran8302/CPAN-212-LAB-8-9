export interface ReductionRequest {
  _id: string;
  policyId: string;
  requestedBy: string;
  currentCoverage: number;
  requestedCoverage: number;
  reason: string;
  status: string;
  reviewedBy?: string;
  reviewComment?: string;
  createdAt?: string;
  updatedAt?: string;
}