const statusBadge = (result) => {
  if (result?.valid === true || result?.panStatus === "VALID") {
    return "success";
  }
  if (result?.valid === false || result?.panStatus === "INVALID") {
    return "danger";
  }
  return "neutral";
};

const statusLabel = (result) => {
  if (result?.panStatus) return result.panStatus;
  if (result?.valid === true) return "VALID";
  if (result?.valid === false) return "INVALID";
  return "UNKNOWN";
};

export default function VerificationResult({ result, error }) {
  if (error) {
    return (
      <section className="card result-card error-card">
        <h2>Verification Failed</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="card result-card placeholder-card">
        <h2>Result</h2>
        <p>Submit the form to see PAN verification details here.</p>
      </section>
    );
  }

  return (
    <section className="card result-card">
      <div className="result-header">
        <h2>Verification Result</h2>
        <span className={`badge ${statusBadge(result)}`}>
          {statusLabel(result)}
        </span>
      </div>

      {result.message && <p className="result-message">{result.message}</p>}

      <dl className="result-grid">
        <div>
          <dt>Reference ID</dt>
          <dd>{result.referenceId ?? "—"}</dd>
        </div>
        <div>
          <dt>PAN</dt>
          <dd>{result.pan}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{result.type ?? "—"}</dd>
        </div>
        <div>
          <dt>Name Provided</dt>
          <dd>{result.nameProvided ?? "—"}</dd>
        </div>
        <div>
          <dt>Registered Name</dt>
          <dd>{result.registeredName ?? "—"}</dd>
        </div>
        <div>
          <dt>Name on PAN Card</dt>
          <dd>{result.namePanCard ?? "—"}</dd>
        </div>
        <div>
          <dt>Aadhaar Seeding</dt>
          <dd>{result.aadhaarSeedingStatus ?? "—"}</dd>
        </div>
        <div>
          <dt>Last Updated</dt>
          <dd>{result.lastUpdatedAt ?? "—"}</dd>
        </div>
        <div className="full-width">
          <dt>Aadhaar Seeding Description</dt>
          <dd>{result.aadhaarSeedingStatusDesc ?? "—"}</dd>
        </div>
      </dl>
    </section>
  );
}
