"use client";

import { useState } from "react";
import Workspace from "./Workspace";
import ResultCard from "./ResultCard";
import { analyzeText } from "../utils/analyzer";

/**
 * Client island that owns the detector's interactive state. Kept separate so
 * the surrounding page can remain a server component for SEO + metadata.
 */
export default function DetectorTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [checks, setChecks] = useState(0);

  function handleCheck() {
    if (analyzing) return;
    setAnalyzing(true);
    setResult(null);
    // Brief pause so the loading state is perceptible; computation is instant.
    setTimeout(() => {
      setResult(analyzeText(text));
      setAnalyzing(false);
      setChecks((c) => c + 1);
    }, 600);
  }

  function handleSample(sampleText) {
    setText(sampleText);
    setResult(null);
  }

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Workspace
          text={text}
          setText={setText}
          onCheck={handleCheck}
          analyzing={analyzing}
          onSample={handleSample}
        />
        <ResultCard result={result} analyzing={analyzing} />
      </div>
      {checks > 0 && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          You have run {checks} {checks === 1 ? "check" : "checks"} this session
          — free, unlimited, and always private.
        </p>
      )}
    </div>
  );
}
