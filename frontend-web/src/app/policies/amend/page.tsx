"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import Alert from "@/components/feedback/Alert";
import { apiRequest } from "@/lib/api";

interface AmendmentFormState {
  policyId: string;
  requestType: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
}

export default function PolicyAmendPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPolicyId = useMemo(
    () => searchParams.get("policyId") ?? "",
    [searchParams]
  );

  const [form, setForm] = useState<AmendmentFormState>({
    policyId: initialPolicyId,
    requestType: "GENERAL_UPDATE",
    currentValue: "",
    requestedValue: "",
    reason: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await apiRequest("/amendments", {
        method: "POST",
        body: {
          policyId: form.policyId,
          requestType: form.requestType,
          currentValue: form.currentValue,
          requestedValue: form.requestedValue,
          reason: form.reason
        }
      });

      router.push("/amendments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit amendment request");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader
          title="Amend Policy"
          subtitle="Submit a secure amendment request for an existing policy."
        />

        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="policyId">Policy Id</label>
            <input
              id="policyId"
              value={form.policyId}
              onChange={(e) => setForm({ ...form, policyId: e.target.value })}
              placeholder="Enter policy id"
            />
          </div>

          <div>
            <label htmlFor="requestType">Request Type</label>
            <select
              id="requestType"
              value={form.requestType}
              onChange={(e) => setForm({ ...form, requestType: e.target.value })}
            >
              <option value="GENERAL_UPDATE">General Update</option>
              <option value="CHANGE_BENEFICIARY">Change Beneficiary</option>
              <option value="UPDATE_VEHICLE_DETAILS">Update Vehicle Details</option>
              <option value="UPDATE_PROPERTY_DETAILS">Update Property Details</option>
              <option value="CHANGE_CONTACT_INFORMATION">Change Contact Information</option>
              <option value="CHANGE_COVERAGE_DETAILS">Change Coverage Details</option>
            </select>
          </div>

          <div>
            <label htmlFor="currentValue">Current Value</label>
            <input
              id="currentValue"
              value={form.currentValue}
              onChange={(e) => setForm({ ...form, currentValue: e.target.value })}
              placeholder="Current value"
            />
          </div>

          <div>
            <label htmlFor="requestedValue">Requested Value</label>
            <input
              id="requestedValue"
              value={form.requestedValue}
              onChange={(e) => setForm({ ...form, requestedValue: e.target.value })}
              placeholder="Requested value"
            />
          </div>

          <div className="full-span">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Provide the business reason for this amendment request"
            />
          </div>

          {error ? (
            <div className="full-span">
              <Alert variant="error" message={error} />
            </div>
          ) : null}

          <div className="full-span actions-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.back()}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Amendment Request"}
            </button>
          </div>
        </form>
      </PageShell>
    </ProtectedRoute>
  );
}