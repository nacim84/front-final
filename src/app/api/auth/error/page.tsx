'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function Error() {
 const searchParams = useSearchParams();
 return (
  <Card className="space-y-6 w-full h-full bg-red-200/80 dark:bg-red-900/40 max-w-[30vw] min-h-[10vw] p-6 mx-auto rounded-lg shadow-lg">
   <h2 className="text-2xl text-center text-red-500">Something went wrong!</h2>
   <p className='text-sm text-center font-normal italic'>{searchParams.get("error")}</p>
   <div className='flex gap-4'>
    <Link href="/auth/signin" className={buttonVariants({ variant: "customPositive", size: "sm", className: "flex items-center justify-center gap-2 px-4 whitespace-nowrap font-semibold" })}>
     Try again
    </Link>
    <Link href="/" className={buttonVariants({ variant: "customPositive", size: "sm", className: "flex items-center justify-center gap-2 px-4 whitespace-nowrap font-semibold" })}>
     Go to home page
    </Link>
   </div>
  </Card>
 );
}