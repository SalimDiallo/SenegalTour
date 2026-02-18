import type { PropsWithChildren } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

type ErrorProps = {
  error: string;
  message?: string;
  reset?: () => void;
};

export const Error = ({
  error,
  message,
  reset,
  children,
}: PropsWithChildren<ErrorProps>) => {
  return (
    <div className="min-h-[60vh] flex justify-center items-center px-4 pt-20">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <h2 className="font-heading text-xl font-semibold text-gray-800 mb-2">
          {error}
        </h2>
        {message && (
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {message}
          </p>
        )}
        <div className="flex items-center gap-3 mt-4">
          {reset && (
            <button
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-300"
              onClick={() => reset()}
            >
              <RotateCcw size={14} />
              Réessayer
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
