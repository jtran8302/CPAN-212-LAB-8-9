"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import AmendmentForm from "@/components/forms/AmendmentForm";
import { apiRequest } from "@/lib/api";

export default function CreateAmendmentPage() {
  const router = useRouter();

  async function handleSubmit(payload: {
    policyId: string;
    requestType: string;
    requestedValue: string;
    reason: string;
    currentValue?: string;
  }) {
    await apiRequest("/amendments", {
      method: "POST",
      body: payload
    });

    router.push("/amendments");
  }

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Create Amendment" subtitle="Submit a policy amendment request." />
        <AmendmentForm onSubmit={handleSubmit} />
      </PageShell>
    </ProtectedRoute>
  );
}