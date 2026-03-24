"use client";

import { useState, type FormEvent } from "react";

interface PolicyFormState {
  policyNumber: string;
  insuranceType: string;
  customerId: string;
  coverageAmount: number;
  premiumAmount: number;
  effectiveDate: string;
  expiryDate: string;
}

interface PolicyFormProps {
  onSubmit: (payload: PolicyFormState) => Promise<void>;
}

export default function PolicyForm({ onSubmit }: PolicyFormProps) {
  const [form, setForm] = useState<PolicyFormState>({
    policyNumber: "",
    insuranceType: "LIFE",
    customerId: "",
    coverageAmount: 0,
    premiumAmount: 0,
    effectiveDate: "",
    expiryDate: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div>
        <label>Policy Number</label>
        <input
          value={form.policyNumber}
          onChange={(e) => setForm({ ...form, policyNumber: e.target.value })}
        />
      </div>

      <div>
        <label>Insurance Type</label>
        <select
          value={form.insuranceType}
          onChange={(e) => setForm({ ...form, insuranceType: e.target.value })}
        >
          <option value="LIFE">Life</option>
          <option value="CAR">Car</option>
          <option value="HOME">Home</option>
        </select>
      </div>

      <div>
        <label>Customer Id</label>
        <input
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
        />
      </div>

      <div>
        <label>Coverage Amount</label>
        <input
          type="number"
          value={form.coverageAmount}
          onChange={(e) => setForm({ ...form, coverageAmount: Number(e.target.value) })}
        />
      </div>

      <div>
        <label>Premium Amount</label>
        <input
          type="number"
          value={form.premiumAmount}
          onChange={(e) => setForm({ ...form, premiumAmount: Number(e.target.value) })}
        />
      </div>

      <div>
        <label>Effective Date</label>
        <input
          type="date"
          value={form.effectiveDate}
          onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
        />
      </div>

      <div>
        <label>Expiry Date</label>
        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
        />
      </div>

      <div className="full-span">
        <button className="btn btn-primary" type="submit">
          Create policy
        </button>
      </div>
    </form>
  );
}