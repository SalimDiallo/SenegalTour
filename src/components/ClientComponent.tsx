"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PropsWithChildren, useState } from "react";
import { useEffect } from "react";

const ClientComponent = ({ fr, en }: { fr: string; en: string }) => {
  const [isCLient, setIsClient] = useState(false);
  const [lang, setLng] = useState("");
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
    if (window.localStorage.getItem("lng") !== lang) {
      setLng(window.localStorage.getItem("lng") ?? "en");
    }
    router.refresh();
  }, [lang, router]);

  return <>{lang === "en" ? en : fr}</>;
};

export default ClientComponent;
