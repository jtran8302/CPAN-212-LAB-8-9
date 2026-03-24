"use client";

import { useState, type FormEvent } from "react";

interface AmendmentFormState {
  policyId: string;
  requestType: string;
  requestedValue: string;
  reason: string;
  currentValue?: string;
}

interface AmendmentFormProps {
  onSubmit: (payload: AmendmentFormState) => Promise<void>;
}

export default function AmendmentForm({ onSubmit }: AmendmentFormProps) {
  const [form, setForm] = useState<AmendmentFormState>({
    policyId: "",
    requestType: "",
    requestedValue: "",
    reason: "",
    currentValue: ""
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
        <label>Request Type</label>
        <input value={form.requestType} onChange={(e) => setForm({ ...form, requestType: e.target.value })} />
      </div>
      <div>
        <label>Current Value</label>
        <input value={form.currentValue ?? ""} onChange={(e) => setForm({ ...form, currentValue: e.target.value })} />
      </div>
      <div>
        <label>Requested Value</label>
        <input value={form.requestedValue} onChange={(e) => setForm({ ...form, requestedValue: e.target.value })} />
      </div>
      <div className="full-span">
        <label>Reason</label>
        <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      </div>
      <div className="full-span">
        <button className="btn btn-primary" type="submit">
          Submit amendment request
        </button>
      </div>
    </form>
  );
}