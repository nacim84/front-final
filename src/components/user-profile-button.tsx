import React from "react";
import {
  BarChart2,
  Github,
  LifeBuoy,
  Mail,
  MessageSquare,
  User,
  UserPlus,
  Users,
  Vote,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import SignoutButton from "./signout-button";
import { Session } from "next-auth";
import CustomAvatar from "./custom-avatar";
import { userSupportPath, adminUserPath, adminVotePath, adminInvitePath, adminDashboardPath } from "@/constants/common.constants";

interface UserProfileButtonProps {
  session: Session;
}

const UserProfileButton = ({ session }: UserProfileButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomAvatar avatarUrl={session.user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center justify-start w-full gap-2 p-0">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {
            session.user.role === ("ADMIN" || "OWNER") ?
              <>
                <DropdownMenuItem>
                  <Link href={adminDashboardPath} className="flex items-center justify-start w-full gap-2 p-0">
                    <BarChart2 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={adminVotePath} className="flex items-center justify-start w-full gap-2 p-0">
                    <Vote className="w-4 h-4" />
                    <span>Votes</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={adminUserPath} className="flex items-center justify-start w-full gap-2 p-0">
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </Link>
                </DropdownMenuItem>
              </>
              :
              null
          }
        </DropdownMenuGroup>


        {session.user.role === ("ADMIN" || "OWNER")
          ?
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Link href={adminInvitePath} className="flex items-center justify-start w-full gap-2 p-0">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>Email</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Message</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </>
          :
          null
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="w-4 h-4 mr-2" />
          <span>GitHub</span>
        </DropdownMenuItem>
        {session.user.role !== "ADMIN" ?
          <DropdownMenuItem>
            <Link href={userSupportPath} className="flex items-center justify-start w-full gap-2 p-0">
              <LifeBuoy className="w-4 h-4 mr-2" />
              <span>Support</span>
            </Link>
          </DropdownMenuItem>
          :
          null
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignoutButton variant="ghost" size="noSize" text="Sign-out" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default UserProfileButton;
