"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const ContentTranslation = ({ title }: { title: string }) => {
  const { t } = useTranslation("en");
  return <>{t(title)}</>;
};

export default ContentTranslation;
