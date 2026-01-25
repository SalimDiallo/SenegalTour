"use client";
import { Loader } from "@mantine/core";
import React from "react";
const Loaders = () => {
  return (
    <div>
      <div
        className="flex mx-auto justify-center items-center"
        style={{ height: "60vh" }}
      >
        <Loader variant="bars" />
      </div>
    </div>
  );
};

export default Loaders;
