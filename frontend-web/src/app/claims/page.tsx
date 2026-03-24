"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import { apiRequest } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Claim } from "@/types/claim";

export default function ClaimsPage() {
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
    { key: "incidentDate", label: "Incident Date", render: (row) => formatDate(row.incidentDate) },
    { key: "claimAmount", label: "Claim Amount", render: (row) => formatCurrency(row.claimAmount) },
    { key: "description", label: "Description", render: (row) => row.description },
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Claims" subtitle="Claims history and status tracking." />
        <DataTable columns={columns} data={claims} rowKey={(row) => row._id} />
      </PageShell>
    </ProtectedRoute>
  );
}