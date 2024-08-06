import { useState, useEffect } from "react";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  const updateState = (newState) => {
    setState(newState);
    localStorage.setItem(key, JSON.stringify(newState));
  };
  return [state, updateState];
}
