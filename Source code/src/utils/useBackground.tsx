import React, { createContext, useContext, useEffect, useState } from "react";

interface IBackgroundContext {
  setBackground: (url: string) => void;
}

const BackgroundContext = createContext<IBackgroundContext>({
  setBackground: () => {},
});

export const useBackgroundContext = () => useContext(BackgroundContext);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!backgroundUrl) return;

    document.body.style.backgroundImage = `url('/images/background/${backgroundUrl}')`;
  }, [backgroundUrl]);

  return (
    <BackgroundContext.Provider value={{ setBackground: setBackgroundUrl }}>{children}</BackgroundContext.Provider>
  );
}
