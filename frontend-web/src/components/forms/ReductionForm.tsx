"use client";

import { useState, type FormEvent } from "react";

interface ReductionFormState {
  policyId: string;
  currentCoverage: number;
  requestedCoverage: number;
  reason: string;
}

interface ReductionFormProps {
  onSubmit: (payload: ReductionFormState) => Promise<void>;
}

export default function ReductionForm({ onSubmit }: ReductionFormProps) {
  const [form, setForm] = useState<ReductionFormState>({
    policyId: "",
    currentCoverage: 0,
    requestedCoverage: 0,
    reason: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div>
        <label>Policy Id</label>
        <input value={form.policyId} onChange={(e) => setForm({ ...form, policyId: e.target.value })} />
      </div>
      <div>
        <label>Current Coverage</label>
        <input type="number" value={form.currentCoverage} onChange={(e) => setForm({ ...form, currentCoverage: Number(e.target.value) })} />
      </div>
      <div>
        <label>Requested Coverage</label>
        <input type="number" value={form.requestedCoverage} onChange={(e) => setForm({ ...form, requestedCoverage: Number(e.target.value) })} />
      </div>
      <div className="full-span">
        <label>Reason</label>
        <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      </div>
      <div className="full-span">
        <button className="btn btn-primary" type="submit">
          Submit reduction request
        </button>
      </div>
    </form>
  );
}