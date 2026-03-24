"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import ClaimForm from "@/components/forms/ClaimForm";
import { apiRequest } from "@/lib/api";

export default function CreateClaimPage() {
  const router = useRouter();

  async function handleSubmit(payload: {
    policyId: string;
    claimType: string;
    incidentDate: string;
    claimAmount: number;
    description: string;
  }) {
    await apiRequest("/claims", {
      method: "POST",
      body: payload
    });

    router.push("/claims");
  }

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Create Claim" subtitle="Submit a new insurance claim." />
        <ClaimForm onSubmit={handleSubmit} />
      </PageShell>
    </ProtectedRoute>
  );
}