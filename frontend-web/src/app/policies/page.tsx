"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import { apiRequest } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Policy } from "@/types/policy";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    async function load() {
      const response = await apiRequest<Policy[]>("/policies");
      setPolicies(response.data);
    }

    void load();
  }, []);

  const columns: DataTableColumn<Policy>[] = [
    { key: "policyNumber", label: "Policy Number", render: (row) => row.policyNumber },
    { key: "insuranceType", label: "Type", render: (row) => row.insuranceType },
    { key: "coverageAmount", label: "Coverage", render: (row) => formatCurrency(row.coverageAmount, row.currency) },
    { key: "premiumAmount", label: "Premium", render: (row) => formatCurrency(row.premiumAmount, row.currency) },
    { key: "effectiveDate", label: "Effective Date", render: (row) => formatDate(row.effectiveDate) },
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader
          title="Policies"
          subtitle="Life, Car, and Home insurance portfolio records."
        />
        <DataTable columns={columns} data={policies} rowKey={(row) => row._id} />
      </PageShell>
    </ProtectedRoute>
  );
}