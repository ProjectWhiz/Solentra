"use client";

import { useEffect, useState } from "react";

type Health = {
  status: string;
};

export default function HealthClient() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    let cancelled = false;
    async function fetchHealth() {
      try {
        const res = await fetch(`${API.replace(/\/+$/, "")}/health`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        if (!cancelled) setHealth(json as Health);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Unknown error");
      }
    }

    fetchHealth();
    return () => {
      cancelled = true;
    };
  }, [API]);

  if (error) return <div className="text-red-600">API error: {error}</div>;
  if (!health) return <div className="text-gray-500">Checking API...</div>;
  return <div className="text-green-600">API status: {health.status}</div>;
}
