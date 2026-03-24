"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import RoleGuard from "@/components/guards/RoleGuard";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import type { Claim } from "@/types/claim";
import { apiRequest } from "@/lib/api";

export default function ClaimReviewPage() {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    async function load() {
      const response = await apiRequest<Claim[]>("/claims");
      setClaims(response.data);
    }

    void load();
  }, []);

  const columns: DataTableColumn<Claim>[] = [
    { key: "claimType", label: "Claim Type", render: (row) => row.claimType },
    { key: "claimAmount", label: "Amount", render: (row) => row.claimAmount },
    { key: "description", label: "Description", render: (row) => row.description },
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CLAIMS_ADJUSTER", "ADMIN"]}>
        <PageShell>
          <SectionHeader title="Claim Review" subtitle="Claims decision workspace." />
          <DataTable columns={columns} data={claims} rowKey={(row) => row._id} />
        </PageShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}