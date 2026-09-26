import { useEffect, useEffectEvent, useState } from 'react';

/**
 * Loads blog data for `key`, starting from server-rendered `initial` data
 * when there is some (so hydration matches), otherwise fetching it.
 * `data` is null while loading. `load` must resolve (never reject) except
 * when aborted.
 */
export function useBlogData<T>(key: string, initial: T | null, load: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<{ key: string; data: T | null }>(() => ({ key, data: initial }));
  const [attempt, setAttempt] = useState(0);
  const data = state.key === key ? state.data : null;
  const runLoad = useEffectEvent(load);

  useEffect(() => {
    if (data !== null) return;
    const controller = new AbortController();
    runLoad(controller.signal)
      .then((result) => setState({ key, data: result }))
      .catch(() => {
        // Aborted by navigation or unmount: nothing to update.
      });
    return () => controller.abort();
  }, [key, attempt, data]);

  const retry = () => {
    setState({ key, data: null });
    setAttempt((count) => count + 1);
  };

  return { data, retry };
}
