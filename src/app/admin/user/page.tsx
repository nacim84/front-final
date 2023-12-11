import { UserForm } from '@/components/user-form';
import React from 'react'

const UserFormPage = () => {
 return (
  <div className='flex flex-col items-center justify-center gap-6'>
   <h3 className='text-2xl font-semibold'>Ajouter un électeur</h3>
   <UserForm />
  </div>
 )
}

export default UserFormPage;