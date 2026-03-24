"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import ReductionForm from "@/components/forms/ReductionForm";
import { apiRequest } from "@/lib/api";

export default function CreateReductionPage() {
  const router = useRouter();

  async function handleSubmit(payload: {
    policyId: string;
    currentCoverage: number;
    requestedCoverage: number;
    reason: string;
  }) {
    await apiRequest("/reductions", {
      method: "POST",
      body: payload
    });

    router.push("/reductions");
  }

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Create Reduction" subtitle="Submit a coverage reduction request." />
        <ReductionForm onSubmit={handleSubmit} />
      </PageShell>
    </ProtectedRoute>
  );
}