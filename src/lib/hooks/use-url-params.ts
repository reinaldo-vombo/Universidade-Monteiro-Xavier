// hooks/useUrlParams.ts
import { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';

export function useUrlParams<T extends Record<string, string>>(
  defaults: T,
  options: { searchKey?: string } = {},
) {
  const { searchKey = 'search' } = options;
  const location = useLocation();

  const [rawParams, setRawParams] = useState(
    () => new URLSearchParams(location.search),
  );

  useEffect(() => {
    setRawParams(new URLSearchParams(location.search));
  }, [location.search]);

  const values = Object.fromEntries(
    Object.keys(defaults).map((key) => [
      key,
      rawParams.get(key) ?? defaults[key],
    ]),
  ) as T;

  const [searchInput, setSearchInput] = useState(values[searchKey] ?? '');

  useEffect(() => {
    setSearchInput(values[searchKey] ?? '');
  }, [values[searchKey]]);

  function setParams(next: Partial<T>) {
    const p = new URLSearchParams(rawParams.toString());

    Object.entries(next).forEach(([key, val]) => {
      if (val && val !== defaults[key]) {
        p.set(key, val as string);
      } else {
        p.delete(key);
      }
    });

    const qs = p.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
    setRawParams(new URLSearchParams(qs)); // ← o único correcto
  }

  function submitSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setParams({ [searchKey]: searchInput.trim() } as Partial<T>);
  }

  function resetParams() {
    window.history.replaceState(null, '', location.pathname);
    setRawParams(new URLSearchParams());
    setSearchInput(defaults[searchKey] ?? '');
  }

  return {
    values,
    setParams,
    searchInput,
    setSearchInput,
    submitSearch,
    resetParams,
  };
}
