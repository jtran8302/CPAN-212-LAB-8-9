"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import RoleGuard from "@/components/guards/RoleGuard";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import PolicyForm from "@/components/forms/PolicyForm";
import { apiRequest } from "@/lib/api";

export default function CreatePolicyPage() {
  const router = useRouter();

  async function handleSubmit(payload: {
    policyNumber: string;
    insuranceType: string;
    customerId: string;
    coverageAmount: number;
    premiumAmount: number;
    effectiveDate: string;
    expiryDate: string;
  }) {
    await apiRequest("/policies", {
      method: "POST",
      body: payload
    });

    router.push("/policies");
  }

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["AGENT", "ADMIN"]}>
        <PageShell>
          <SectionHeader
            title="Create Policy"
            subtitle="Create a new insurance policy for a customer."
          />
          <PolicyForm onSubmit={handleSubmit} />
        </PageShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}