import React from 'react'

type Props = {}

export const ClosedWorkflowSpan = (props: Props) => {
 return (
  <span className='text-white text-sm bg-red-400/40 rounded-full py-1 px-3 flex items-center justify-center gap-2'>
   Closed
  </span>
 );
};