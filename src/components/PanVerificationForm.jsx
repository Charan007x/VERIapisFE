import { useState } from "react";
import { verifyPan } from "../api/client";

const initialForm = {
  pan: "",
  name: "",
};

export default function PanVerificationForm({ onSuccess, onError }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pan" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    onError(null);

    try {
      const payload = { pan: form.pan };
      if (form.name.trim()) {
        payload.name = form.name.trim();
      }

      const response = await verifyPan(payload);
      onSuccess(response.data);
      setForm(initialForm);
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>PAN Sync Verification</h2>
      <p className="subtitle">
        Check PAN existence and retrieve registered name via Cashfree sandbox.
      </p>

      <label>
        PAN
        <input
          name="pan"
          value={form.pan}
          onChange={handleChange}
          placeholder="ABCPV1234D"
          maxLength={10}
          required
        />
      </label>

      <label>
        Name <span className="optional">(optional)</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify PAN"}
      </button>
    </form>
  );
}
