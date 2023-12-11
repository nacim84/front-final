"use client";

import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loader() {
 return (
  <div className="flex items-center justify-center h-full fixed inset-0 z-50 bg-transparent backdrop-blur-sm">
   <ScaleLoader color="#000000" />
  </div>
 );
};
