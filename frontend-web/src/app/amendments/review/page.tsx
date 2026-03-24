"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import RoleGuard from "@/components/guards/RoleGuard";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DataTable, { type DataTableColumn } from "@/components/tables/DataTable";
import StatusBadge from "@/components/tables/StatusBadge";
import type { AmendmentRequest } from "@/types/amendment";
import { apiRequest } from "@/lib/api";

export default function AmendmentReviewPage() {
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
    { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["UNDERWRITER", "ADMIN"]}>
        <PageShell>
          <SectionHeader title="Amendment Review" subtitle="Underwriting review workspace." />
          <DataTable columns={columns} data={items} rowKey={(row) => row._id} />
        </PageShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}