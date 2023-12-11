import { ReactNode } from "react";

const authLayout = ({ children }: { children: ReactNode }) => {
 return (
  <section className="h-full pt-32 mx-auto">
   {children}
  </section>
 );
};

export default authLayout;