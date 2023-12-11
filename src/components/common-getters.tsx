import React from 'react'
import { CommonDialog } from './common-dialog';
import { GetVoterVoterForm } from './get-voter-voter-form';
import { GetVotedVoterVoterForm } from './get-voted-voter-voter-form';
import { GetCurrentVoteCommonForm } from './get-current-vote-common-form';
import { GetVoteCommonForm } from './get-vote-common-form';
import { FileUp } from 'lucide-react';
import { Card } from './ui/card';

interface CommonGettersProps {
 currentVoteId: number;
}

export const CommonGetters = ({ currentVoteId }: CommonGettersProps) => {
 return (
  <Card className="flex items-center justify-between gap-4 w-full h-full bg-primary-foreground min-w-[60vw] py-4 px-6 rounded-lg shadow-lg">
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVoterVoterForm />} variant={"default"} className='font-semibold' text="Vérifier votre enregistrement" title="Vérifier votre enregistrement" icon={<FileUp className='h-5 w-5' />} size="lg" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVotedVoterVoterForm currentVoteId={currentVoteId} />} variant={"default"} className='font-semibold' text="Vérifier votre vote" title="Vérifier votre vote" icon={<FileUp className='h-5 w-5' />} size="lg" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetCurrentVoteCommonForm />} variant={"default"} className='font-semibold' text="Consulter le vote en cours" title="Consulter le vote en cours" icon={<FileUp className='h-5 w-5' />} size="lg" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVoteCommonForm currentVoteId={currentVoteId} />} variant={"default"} className='font-semibold' text="Consulter un vote cloturé" title="Consulter un vote cloturé" icon={<FileUp className='h-5 w-5' />} size="lg" />
   </div>
  </Card>
 )
};