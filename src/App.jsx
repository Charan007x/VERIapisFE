import { useState } from "react";
import PanVerificationForm from "./components/PanVerificationForm";
import VerificationResult from "./components/VerificationResult";

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <p className="eyebrow">VeriAPIs</p>
        <h1>Identity Verification Portal</h1>
        <p className="lead">
          PAN Sync verification powered by Cashfree. Aadhaar verification
          coming soon.
        </p>
      </header>

      <main className="layout">
        <PanVerificationForm
          onSuccess={setResult}
          onError={(message) => {
            setError(message);
            setResult(null);
          }}
        />
        <VerificationResult result={result} error={error} />
      </main>
    </div>
  );
}
