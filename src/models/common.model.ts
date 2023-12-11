
export type TEventSignature = "event VoteCreatedActivated(string hashDescription, uint256 voteId, uint256 startDate, uint256 endDate, address adminAddress, uint8 role, bool isEnabled)"
 | "event VoterRegistered(address voterAddress, bool isRegistered, uint8 role)"
 | "event Voted(uint256 voteId, address voterAddress, bool isRegistered, uint8 role, string voteChoice)"
 | "event VoteCompleted(string hashDescription, uint256 voteId, uint256 startDate, uint256 endDate, address adminAddress, uint8 role, bool isEnabled)";


export interface IVoteContract {
 hashDescription: string;
 startDate: bigint;
 endDate: bigint;
 isEnabled: boolean;
}

export interface IVoterContract {
 isRegistered: boolean;
 hasVoted: boolean;
 role: number;
 voteChoice: string;
}

export interface IUser {
 id?: string;
 firstName: string,
 lastName: string,
 addressHash?: string;
 email: string;
 role: EnumRole;
 image?: string;
};

export interface IVote {
 id: number;
 type: VoteTypeEnum;
 voteTemporality: VoteTemporalityEnum;
 title: string
 description: string;
 startDate: Date;
 endDate: Date;
 alertSender: string;
 isEnabled: boolean;
 authorId: number;
};

export interface IResponseBack {
 flag: boolean;
 data?: IVote | IVote[] | IUser | IUser[] | any;
 error?: string | null;
}

export enum EnumRole {
 USER = 0,
 ADMIN = 1
}

export enum VoteTypeEnum {
 RESOLUTIONS,
 CANDIDATES_PROPOSALS,
 ELECTIONS,
}

export enum VoteTemporalityEnum {
 LIVE,
 PLANNED,
}