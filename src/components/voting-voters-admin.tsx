
import { CommonDialog } from "./common-dialog";
import { FileUp } from "lucide-react";
import { GetVoterForm } from "./get-voter-form";
import { GetVotedVoterForm } from "./get-voted-voter-form";

interface VotingVotersAdminProps {
 currentVoteId: number;
}

export const VotingVotersAdmin = ({ currentVoteId }: VotingVotersAdminProps) => {

 return (
  <div className="p-2 border border-primary rounded-3xl w-full flex flex-col gap-4">
   <h1 className='font-bold text-xl text-center'>Electeurs</h1>
   <CommonDialog component={<GetVoterForm />} text="Consulter un électeur" title="Consulter un électeur" icon={<FileUp className='h-5 w-5' />} size="lg" />
   <CommonDialog component={<GetVotedVoterForm currentVoteId={currentVoteId} />} text="Vérifier le vote d&apos;un électeur" title="Vérifier le vote d&apos;un électeur" icon={<FileUp className='h-5 w-5' />} size="lg" />
  </div>
 )
};