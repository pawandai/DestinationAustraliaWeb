"use client";

import { useCallback, useState } from "react";
import type { ActionState } from "~/actions/createSafeAction";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {},
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setLoading(true);

      try {
        const result = await action(input);

        if (!result) return;

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred");
        options.onError?.("An error occurred");
      } finally {
        setLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return {
    error,
    data,
    loading,
    execute,
  };
};
