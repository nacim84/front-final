import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { IUser } from '@/models/common.model'

interface AllUsersTableProps {
 data: IUser[]
}

export const AllUsersTable = ({ data }: AllUsersTableProps) => {
 return (
  <div className='w-full max-h-[80vh] p-2 gap-10 flex flex-col items-center overflow-auto'>
   <div className="flex flex-col gap-4 items-center justify-between">
    <h1 className='text-xl font-semibold'>Les électeurs</h1>
    {data && data.length
     ?
     <Table className="border w-[30vw] md:w-[50vw]">
      <TableHeader>
       <TableRow>
        <TableHead className="font-semibold max-w-xs truncate">Prénom</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Nom</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Email</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Hash adresse</TableHead>
        <TableHead className="font-semibold max-w-xs truncate">Role</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody className=''>
       {
        data.map(row =>
         <TableRow key={row.email}>
          <TableCell className="font-medium max-w-xs truncate">{row.firstName}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.lastName}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.email}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.addressHash}</TableCell>
          <TableCell className="font-medium max-w-xs truncate">{row.role}</TableCell>
         </TableRow>
        )
       }
      </TableBody>
     </Table>
     :
     <div className='p-10'>
      <span className='text-primary font-semibold text-lg italic'>Pas d&apos;électeurs enregistrés.</span>
     </div>
    }
   </div>
  </div>
 )
};