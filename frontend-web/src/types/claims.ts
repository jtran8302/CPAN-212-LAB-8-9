export interface Claim {
  _id: string;
  policyId: string;
  submittedBy: string;
  claimType: string;
  incidentDate: string;
  claimAmount: number;
  description: string;
  status: string;
  assignedAdjuster?: string;
  decisionComment?: string;
  createdAt?: string;
  updatedAt?: string;
}