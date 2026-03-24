"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import type { ReductionRequest } from "@/types/reduction";
import { apiRequest } from "@/lib/api";

export default function ReductionsPage() {
  const [items, setItems] = useState<ReductionRequest[]>([]);

  useEffect(() => {
    async function load() {
      const response = await apiRequest<ReductionRequest[]>("/reductions");
      setItems(response.data);
    }

    void load();
  }, []);

  const columns: DataTableColumn<ReductionRequest>[] = [
    { key: "currentCoverage", label: "Current Coverage", render: (row) => row.currentCoverage },
    { key: "requestedCoverage", label: "Requested Coverage", render: (row) => row.requestedCoverage },
    { key: "reason", label: "Reason", render: (row) => row.reason },
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Reductions" subtitle="Coverage reduction requests and outcomes." />
        <DataTable columns={columns} data={items} rowKey={(row) => row._id} />
      </PageShell>
    </ProtectedRoute>
  );
}