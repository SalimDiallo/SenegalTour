"use client";
import { useRouter } from "next/navigation";
import { Error } from "../src/components/ui/Error";
import { ArrowLeft } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <Error error="Quelque chose s'est mal passée" reset={reset}>
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-cyan-300 hover:text-cyan-600 text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-300"
      >
        <ArrowLeft size={14} />
        Retour
      </button>
    </Error>
  );
}
