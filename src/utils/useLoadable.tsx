import React, { useCallback, useEffect, useState } from "react";

export default function useLoadable<
  fn extends (...args: any[]) => Promise<any>,
  args extends Parameters<fn>,
  retType extends ReturnType<fn>
>(fetcher: fn, ...args: args) {
  const [val, setVal] = useState<Awaited<retType> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  fetcher(...args)
    .then((val) => {
      setVal(val);
      setLoading(false);
    })
    .catch((e) => {
      setError(e.toString());
      setLoading(false);
    });

  return { val, loading, error };
}
