"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren, useEffect, useState } from "react";
import i18next from "i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import "../src/internationalization/i18n";
import { useRouter } from "next/navigation";
import mailgo from "mailgo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const mailgoConfig = {
  dark: false,
};

export default function Providers({ children }: PropsWithChildren) {
  const router = useRouter();
  const [lang, setLng] = useState("");
  const [client, setClient] = useState(false);
  useEffect(() => {
    i18next.changeLanguage(window.localStorage.getItem("lng") ?? "en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    router.refresh();
    setLng(window.localStorage.getItem("lng") ?? "en");
    setClient(true);
    if (client) {
      if (window.localStorage.getItem("lng") !== lang) {
        window.location.reload();
      }
    }
  }, [lang, router]);

  useEffect(() => {
    AOS.init();
    mailgo(mailgoConfig);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
