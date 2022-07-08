import React, { useState, useEffect } from "react";

export default function useLoadable<
  fn extends (...args: any[]) => Promise<any>
>(fetcher: fn, ...args: Parameters<fn>) {
  const [val, setVal] = useState<Awaited<ReturnType<fn>> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetcher(...args)
      .then((val) => {
        setVal(val);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.toString());
        setLoading(false);
      });
  }, []);

  return {
    val: val as Awaited<ReturnType<fn>> | null,
    loading: loading as boolean,
    error: error as string | null,
  };
}
