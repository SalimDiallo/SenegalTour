import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import React from "react";

const Step = ({ title, content }: { title: string; content?: string }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="500"
      className="my-5"
    >
      <h1 className="text-primary text-lg font-sm font-bold mb-2">
        <ContentTranslation title={title} />
      </h1>
      <div className="text-base font-medium">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Step;
