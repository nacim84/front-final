import { ReactNode } from "react";

const authLayout = ({ children }: { children: ReactNode }) => {
 return (
  <section className="h-full pt-40 max-w-5xl mx-auto">
   {children}
  </section>
 );
};

export default authLayout;