import { useState } from "react";

export function useAxioErrorHandler() {
  const [error, setErr] = useState<Error | undefined>();

  const setError = (err: Error) => {
    setErr(err);
  };

  const clear = () => setErr(undefined);
  return {
    error,
    setError,
    clear,
  };
}
