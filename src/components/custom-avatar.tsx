import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

export interface CustomAvatarProps {
 avatarUrl: string | undefined;
}

const CustomAvatar = ({ avatarUrl }: CustomAvatarProps) => {
 return (
  <Avatar className="w-9 h-9">
   <AvatarImage src={avatarUrl} alt="Avatar image" />
   <AvatarFallback>
    <Skeleton className="w-9 h-9 rounded-full" />
   </AvatarFallback>
  </Avatar>
 )
}
export default CustomAvatar;