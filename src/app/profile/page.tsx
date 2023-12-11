import { CommonProfile } from "@/components/common-profile";
import { CommonProfileTallyVote } from "@/components/common-profile-tally-vote";
import { GlobalProfile } from "@/components/global-profile";
import { getRequireNextAuthSession } from "@/lib/utils";
import { IVote } from "@/models/common.model";

const ProfilePage = async () => {
  const session = await getRequireNextAuthSession();
  // Load active vote to display 
  return (
    <div className="flex flex-col gap-20 items-center justify-center" >
      <p className="text-2xl italic font-bold whitespace-nowrap">{
        (session && session.user)
        &&
        <>
          Bonjour <span className="text-primary">{session.user?.firstName} {session.user?.lastName}</span>, veuillez procéder au referendum municipale ci-dessous;
        </>
      }
      </p>
      <GlobalProfile />
    </div>
  );
};

export default ProfilePage;
