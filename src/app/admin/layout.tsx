"use client";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
 return (
  <section className="h-full pt-32 max-w-5xl mx-auto flex flex-col items-center">
   {children}
  </section>
 );
};

export default AdminLayout;
