import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import React from "react";

const Step = ({
  title,
  content,
  icon,
}: {
  title: string;
  content?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-gray-50 last:border-0">
      {icon && (
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
          {icon}
        </div>
      )}
      <div className="pt-0.5">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
          <ContentTranslation title={title} />
        </p>
        <p className="text-sm text-gray-800 font-semibold mt-0.5">{content}</p>
      </div>
    </div>
  );
};

export default Step;
