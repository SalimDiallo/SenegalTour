import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../src/config/siteConfig";
import { Metadata } from "next";
import ContentTranslation from "./ContentTranslation";
import ClientComponent from "../../../src/components/ClientComponent";
import { toursData } from "../../../src/data/tours";
import Step from "../../../src/components/sections/tours/tour/Step";

export async function generateMetadata({
  params,
}: {
  params: { tourId: string };
}): Promise<Metadata> {
  const tour = toursData[Number(params.tourId)];

  return {
    title: ` ${tour?.title} : Senegal Premuim Tour`,
    openGraph: {
      title: `${tour?.title} - Senegal Tourisme Destination Travel Agency`,
    },
  };
}

const page = ({ params }: { params: { tourId: string } }) => {
  const tour = toursData[Number(params.tourId)];

  if (!tour) {
    return (
      <div>
        <h1 className="text-4xl mx-auto">Destination Non Trouvé</h1>
      </div>
    );
  }
  return (
    <div className="relative">
      <Image
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="500"
        width={1000}
        height={500}
        src={imgTourUrl(tour.image)}
        alt=""
        className="w-full self-center min-h-[35rem] max-h-[40rem]  object-cover "
      />

      <div className="mx-4">
        <div className="max-w-6xl my-10 py-3  max-sm:px-2 mx-auto flex justify-center items-center max-xl:px-10 border-2">
          <div className="grid lg:grid-cols-2 px-2 lg:gap-3">
            {/* left content */}
            <div className="lg:px-5">
              <div
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="500"
                className="text-lg  font-extrabold mt-2 mb-5 flex justify-between items-start gap-4"
              >
                <h1>
                  {" "}
                  <ClientComponent fr={tour.titlefr} en={tour.title} />{" "}
                </h1>
                <h3 className="text-md">
                  <ContentTranslation title="common.from" /> :
                  <span className="text-2xl text-Sky-500 ">€{tour?.price}</span>
                  <span className="text-xs font-extralight">
                    / <ContentTranslation title="common.person" />
                  </span>
                </h3>
              </div>
              <p className="text-md font-extralight">
                {" "}
                <ClientComponent
                  fr={tour.descriptionfr}
                  en={tour.description}
                />{" "}
              </p>

              <div>
                <Step
                  title="tour.duration"
                  content={`+ ${tour.duration} hours `}
                ></Step>
                <Step
                  title="tour.price"
                  content={`€${tour.price} / person`}
                ></Step>
                <Step
                  title="tour.destination"
                  content={`${tour.address}`}
                ></Step>
                <Step title="tour.statut" content={`Disponible`}></Step>
              </div>
            </div>
            {/* rigth content */}
            <div>
              <Image
                width={1000}
                height={500}
                src={imgTourUrl(tour?.imageA ?? tour.imageB ?? tour.image)}
                alt=""
                className="w-full self-center  mb-4 "
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration="500"
              />

              {/* <div>
                <h1 className="font-bold text-xl py-3">
                  <ContentTranslation title="tour.book" />
                </h1>
                <FormContact tourId={tour.id} />
              </div> */}
            </div>
            {/* <div className="py-3 lg:col-span-2  border my-5 rounded-md w-full p-2 px-5">
              <h1 className="font-bold text-lg">
                {" "}
                <ContentTranslation title="common.reviews" />
              </h1>
              <Reviews tourId={tour.id} Reviews={reviews} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
