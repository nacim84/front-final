import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Main } from "@/components/main";

export default async function RootPage() {

  return (
    <MaxWidthWrapper className='mb-12 mt-20 sm:mt-28 flex flex-col items-center justify-center text-center'>
      <Main />
    </MaxWidthWrapper>
  );
};
