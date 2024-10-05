"use client";

import { useEffect } from "react";
import useSWR, { Fetcher } from "swr";

import { type SearchResult } from "./types";

const fetcher: Fetcher<SearchResult[], string> = (url) =>
  fetch(url).then((res) => res.json());

export const useSearch = (debouncedSearch: string | undefined) => {
  const { data, error, isLoading } = useSWR<SearchResult[]>(
    debouncedSearch
      ? `/api/search?q=${encodeURIComponent(debouncedSearch)}`
      : null,
    fetcher
  );
  return {
    data,
    status: error ? "error" : isLoading ? "loading" : "idle",
    error,
  };
};

export const useHotkey = (
  onTrigger: (_: boolean | ((_: boolean) => boolean)) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "p" && event.metaKey) {
        event.preventDefault();
        onTrigger((prev) => !prev);
      } else if (event.key === "Escape") {
        onTrigger(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);
};
