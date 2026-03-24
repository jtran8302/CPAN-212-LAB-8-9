"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/formatters";
import type { AmendmentRequest } from "@/types/amendment";

export default function AmendmentsPage() {
  const [items, setItems] = useState<AmendmentRequest[]>([]);

  useEffect(() => {
    async function load() {
      const response = await apiRequest<AmendmentRequest[]>("/amendments");
      setItems(response.data);
    }

    void load();
  }, []);

  const columns: DataTableColumn<AmendmentRequest>[] = [
    { key: "requestType", label: "Request Type", render: (row) => row.requestType },
    { key: "requestedValue", label: "Requested Value", render: (row) => row.requestedValue },
    { key: "reason", label: "Reason", render: (row) => row.reason },
    { key: "createdAt", label: "Created", render: (row) => formatDate(row.createdAt) },
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader title="Amendments" subtitle="Policy amendment requests and statuses." />
        <DataTable columns={columns} data={items} rowKey={(row) => row._id} />
      </PageShell>
    </ProtectedRoute>
  );
}