import { useState } from "react";

export default function useLocalStorage<T>(
  initialKey: string,
  initialValue: T
) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(initialKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("Error reading localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(initialKey, JSON.stringify(value));
      } catch (error) {
        console.log("Error writing localStorage", error);
      }
    }
  };

  const remoteItem = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(initialKey);
      } catch (error) {
        console.log("Error removing localStorage", error);
      }
    }
  };

  return [storedValue, setValue, remoteItem] as const;
}
