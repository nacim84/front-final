import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { TUserSchema } from '@/models/common.schema';
import { authorities } from '@/constants/common.constants';

interface AuthoritiesMenuProps {
  formUser: UseFormReturn<TUserSchema, any, undefined>;
  field: ControllerRenderProps<TUserSchema, "role">
}

const AuthoritiesMenu = ({ formUser }: AuthoritiesMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size='lg' className='w-full text-base rounded-full'>Authorities</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center justify-between p-2 gap-8 h-10">
        {authorities.map((item) => (
          <FormField
            key={item}
            control={formUser.control}
            name="role"
            render={({ field }) => {
              return (
                <FormItem
                  key={item}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <>
                    <Checkbox
                      checked={field.value === item}
                      onCheckedChange={() => {
                        return field.onChange(item)
                      }}
                    />
                  </>
                  <FormLabel className="font-normal">
                    {item}
                  </FormLabel>
                </FormItem>
              )
            }}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AuthoritiesMenu;