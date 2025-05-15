import { useState } from "react";

export default function useLocalStorage<T>(
  initialKey: string,
  initialValue: T
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(initialKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("Error reading localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(initialKey, JSON.stringify(value));
    } catch (error) {
      console.log("Error writing localStorage", error);
    }
  };

  const remoteItem = () => {
    try {
      window.localStorage.removeItem(initialKey);
    } catch (error) {
      console.log("Error remoting localStorage", error);
    }
  };

  return [storedValue, setValue, remoteItem] as const;
}
