"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren, useEffect, useState } from "react";
import i18next from "i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import "../src/internationalization/i18n";
import mailgo from "mailgo";

const mailgoConfig = {
  dark: false,
};

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined') {
      const storedLang = window.localStorage.getItem("lng") ?? "en";
      i18next.changeLanguage(storedLang);
      AOS.init();
      mailgo(mailgoConfig);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
