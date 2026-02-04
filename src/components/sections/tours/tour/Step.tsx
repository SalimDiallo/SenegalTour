import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import React from "react";

const Step = ({ title, content, icon }: { title: string; content?: string; icon?: React.ReactNode }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      {icon && (
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 mt-0.5">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          <ContentTranslation title={title} />
        </p>
        <p className="text-sm text-gray-800 font-semibold mt-0.5">{content}</p>
      </div>
    </div>
  );
};

export default Step;
