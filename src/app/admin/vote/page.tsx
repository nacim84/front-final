import { VoteForm } from "@/components/vote-form";
const UserFormPage = () => {
 return (
  <div className='flex flex-col items-center justify-center gap-6'>
   <h3 className='text-2xl font-semibold'>Ajouter un scrutin</h3>
   <VoteForm />
  </div>
 )
}

export default UserFormPage;