"use client";

import { useState, type FormEvent } from "react";

interface ClaimFormState {
  policyId: string;
  claimType: string;
  incidentDate: string;
  claimAmount: number;
  description: string;
}

interface ClaimFormProps {
  onSubmit: (payload: ClaimFormState) => Promise<void>;
}

export default function ClaimForm({ onSubmit }: ClaimFormProps) {
  const [form, setForm] = useState<ClaimFormState>({
    policyId: "",
    claimType: "CAR_ACCIDENT",
    incidentDate: "",
    claimAmount: 0,
    description: ""
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
        <label>Claim Type</label>
        <select value={form.claimType} onChange={(e) => setForm({ ...form, claimType: e.target.value })}>
          <option value="LIFE_BENEFIT">Life Benefit</option>
          <option value="CAR_ACCIDENT">Car Accident</option>
          <option value="HOME_DAMAGE">Home Damage</option>
        </select>
      </div>
      <div>
        <label>Incident Date</label>
        <input type="date" value={form.incidentDate} onChange={(e) => setForm({ ...form, incidentDate: e.target.value })} />
      </div>
      <div>
        <label>Claim Amount</label>
        <input type="number" value={form.claimAmount} onChange={(e) => setForm({ ...form, claimAmount: Number(e.target.value) })} />
      </div>
      <div className="full-span">
        <label>Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="full-span">
        <button className="btn btn-primary" type="submit">
          Submit claim
        </button>
      </div>
    </form>
  );
}