import { CommonContactForm } from "@/components/common-contact-form";
const SupportFormPage = () => {
 return (
  <div className='flex flex-col items-center justify-center gap-6'>
   <h3 className='text-2xl font-semibold'>Contact your administrator</h3>
   <CommonContactForm />
  </div>
 )
}

export default SupportFormPage;