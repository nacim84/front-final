import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { IVote } from '@/models/common.model';
import { convertToDate } from '@/lib/utils';

interface AllVotesTableProps {
 data: IVote[]
}

export const AllVotesTable = ({ data }: AllVotesTableProps) => {
 return (
  <div className='w-full max-h-[80vh] p-2 gap-10 flex flex-col items-center overflow-auto'>
   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-xl font-semibold'>Les scrutins</h1>
    {data && data.length
     ?
     <Table className="border w-[30vw] md:w-[50vw]">
      <TableHeader>
       <TableRow>
        <TableHead className="font-semibold max-w-xs truncate">Id vote</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Date de début</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Date de fin</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">title</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">description</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">isEnabled</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {
        data.map(row =>
         <TableRow key={row.id}>
          <TableCell className="font-medium max-w-xs truncate">{row.id}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.startDate.toISOString()}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.endDate.toISOString()}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.title}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.description}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{String(row.isEnabled)}</TableCell>
         </TableRow>
        )
       }
      </TableBody>
     </Table>
     :
     <div className='p-10'>
      <span className='text-primary font-semibold text-lg italic'>Pas de scrutins enregistrés.</span>
     </div>
    }
   </div>
  </div>
 )
};