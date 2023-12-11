"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface CommonReportTableProps {
 logs: any[][];
}

export const CommonReportTable = ({ logs }: CommonReportTableProps) => {
 return (
  <div className='w-full max-h-[80vh] p-2 gap-10 flex flex-col items-center overflow-auto'>
   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-base font-semibold'>Add voters track</h1>
    <Table className='border min-w-[80vw]'>
     <TableHeader>
      <TableRow>
       <TableHead>Contract Address</TableHead>
       <TableHead>Transaction Hash</TableHead>
       <TableHead>Hash Description</TableHead>
       <TableHead>Vote id</TableHead>
       <TableHead>Enabled vote</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody className=''>
      {logs && logs.length && logs[0]
       ?
       logs[0].map(row =>
        <TableRow key={row.voteId}>
         <TableCell className="font-medium max-w-xs truncate">{row.address}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.transactionHash}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.hashDescription}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.voteId}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.isEnabled}</TableCell>
        </TableRow>
       )
       :
       null
      }
     </TableBody>
    </Table>
   </div>

   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-base font-semibold'>Add votes track</h1>
    <Table className='border min-w-[80vw]'>
     <TableHeader>
      <TableRow>
       <TableHead>Contract Address</TableHead>
       <TableHead>Transaction Hash</TableHead>
       <TableHead>Voter address</TableHead>
       <TableHead>Role</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody className='text-white'>
      {logs && logs.length && logs[1]
       ?
       logs[1].map(row =>
        <TableRow key={row.voterAddress}>
         <TableCell className="font-medium max-w-xs truncate">{row.address}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.transactionHash}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.voterAddress}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.role ? "ADMIN" : "USER"}</TableCell>
        </TableRow>
       )
       :
       null
      }
     </TableBody>
    </Table>
   </div>

   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-base font-semibold'>Voting track</h1>
    <Table className='border min-w-[80vw]'>
     <TableHeader>
      <TableRow>
       <TableHead>Contract Address</TableHead>
       <TableHead>Transaction Hash</TableHead>
       <TableHead>Voter address</TableHead>
       <TableHead>Vote Choice</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody className='text-white'>
      {logs && logs.length && logs[3]
       ?
       logs[3].map(row =>
        <TableRow key={row.proposalId}>
         <TableCell className="font-medium max-w-xs truncate">{row.address}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.transactionHash}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.voterAddress}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.voteChoice}</TableCell>
        </TableRow>
       )
       :
       null
      }
     </TableBody>
    </Table>
   </div>

   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-base font-semibold'>Tally Vote</h1>
    <Table className='border min-w-[80vw]'>
     <TableHeader>
      <TableRow>
       <TableHead>Contract Address</TableHead>
       <TableHead>Transaction Hash</TableHead>
       <TableHead>Hash Description</TableHead>
       <TableHead>Vote id</TableHead>
       <TableHead>Enabled vote</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody className=''>
      {logs && logs.length && logs[0]
       ?
       logs[0].map(row =>
        <TableRow key={row.voteId}>
         <TableCell className="font-medium max-w-xs truncate">{row.address}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.transactionHash}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.hashDescription}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.voteId}</TableCell>
         <TableCell className="font-medium max-w-xs truncate">{row.isEnabled}</TableCell>
        </TableRow>
       )
       :
       null
      }
     </TableBody>
    </Table>
   </div>
  </div>
 )
};