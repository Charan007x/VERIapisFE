const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function verifyPan(payload) {
  const response = await fetch(`${API_BASE}/api/pan/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Verification request failed");
  }

  return data;
}

export async function fetchVerificationHistory() {
  const response = await fetch(`${API_BASE}/api/pan/history`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch verification history");
  }

  return data.data;
}
