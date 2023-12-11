import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TVoteSchema } from '@/models/common.schema';
import { voteTypes } from '@/constants/common.constants';

interface VoteTypesMenuProps {
  formVote: UseFormReturn<TVoteSchema, any, undefined>;
}

export const VoteTypesMenu = ({ formVote }: VoteTypesMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size='lg' className='w-full text-base font-semibold rounded-full'>Type de vote</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start justify-between gap-2">
        {voteTypes.map((item) => (
          <FormField
            key={item.type}
            control={formVote.control}
            name="type"
            render={({ field }) => {
              return (
                <FormItem
                  key={item.type}
                  className="flex items-start space-x-3 space-y-0 hover:bg-violet-200 p-2 w-full rounded-lg"
                >
                  <>
                    <Checkbox
                      checked={field.value === item.type}
                      onCheckedChange={() => {
                        return field.onChange(item.type)
                      }}
                    />
                  </>
                  <FormLabel className="font-normal">
                    {item.title}
                  </FormLabel>
                </FormItem>
              )
            }}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};