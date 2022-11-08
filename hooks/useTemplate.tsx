import { delay } from "functions/time";
import { useEffect, useState } from "react";

/**
 * Documentation
 */
export default function useTemplate() {
  const [state, setState] = useState(false);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  async function load() {
    console.log("Simulating loading...");
    setLoading(true);
    try {
      await delay();
      setState(true);
      console.log("Simulation succeeded!");
    } catch (error) {
      setError(error);
      console.log("Simulation failed!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { state, loading, error };
}
