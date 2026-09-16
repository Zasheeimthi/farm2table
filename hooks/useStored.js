"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
export function readStore(key, fallback, session = false) {
  try {
    return JSON.parse((session ? sessionStorage : localStorage).getItem(`farmtable:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function useStored(key, fallback, session = false) {
  const initial = useRef(fallback);
  const [value, setValue] = useState(fallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setValue(readStore(key, initial.current, session));
    setReady(true);
  }, [key, session]);
  useEffect(() => {
    if (!ready) return;
    try {
      (session ? sessionStorage : localStorage).setItem(`farmtable:${key}`, JSON.stringify(value));
    } catch {/* The basket remains usable when browser storage is unavailable. */}
  }, [key, value, session, ready]);
  return [value, setValue, ready];
}
