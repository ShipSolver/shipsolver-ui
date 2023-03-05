import React, { useState, useEffect, useCallback } from "react";

export default function useLoadable<
  fn extends (...args: any[]) => Promise<any>
>(fetcher: fn, ...args: Parameters<fn>) {
  const [val, setVal] = useState<Awaited<ReturnType<fn>> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const triggerRefetch = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetcher(...args)
      .then((val) => {
        setVal(val);
      })
      .catch((e) => {
        setError(e.toString());
      })
      .finally(() => setLoading(false));
  }, [trigger]);

  return {
    val: val as Awaited<ReturnType<fn>> | null,
    loading: loading as boolean,
    error: error as string | null,
    triggerRefetch,
  };
}
