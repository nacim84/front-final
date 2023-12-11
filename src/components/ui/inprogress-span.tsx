import React from 'react'
import { BeatLoader } from 'react-spinners';

export const InprogressSpan = () => {
 return (
  <span className='text-white text-sm bg-fuchsia-400/40 rounded-full py-1 px-3 flex items-center justify-center gap-2'>
   Inprogress
   <BeatLoader size={6} color={"white"} />
  </span>
 )
};