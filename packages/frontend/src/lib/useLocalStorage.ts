import { useEffect, useState } from "react";

export const useLocalStorage = (
  key: string
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [storedValue, setStoredValue] = useState<boolean>(() => {
    const generated = window.localStorage.getItem(key);
    return generated ? JSON.parse(generated) : false;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
