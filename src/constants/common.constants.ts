import { TEventSignature } from "@/models/common.model";

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

// Events
export const VoteCreatedActivatedEvent = "event VoteCreatedActivated(string hashDescription, uint256 voteId, uint256 startDate, uint256 endDate, address adminAddress, uint8 role, bool isEnabled)";

export const VoterRegisteredEvent = "event VoterRegistered(address voterAddress, bool isRegistered, uint8 role)";

export const VotedEvent = "event Voted(uint256 voteId, address voterAddress, bool isRegistered, uint8 role, string voteChoice)";

export const VoteCompletedEvent = "event VoteCompleted(string hashDescription, uint256 voteId, uint256 startDate, uint256 endDate, address adminAddress, uint8 role, bool isEnabled)";


// Vote choice
export const POUR = "POUR";

export const CONTRE = "CONTRE";

export const ABSTENTION = "ABSTENTION";

export const allEventItems: TEventSignature[] = [
 VoteCreatedActivatedEvent,
 VoterRegisteredEvent,
 VotedEvent,
 VoteCompletedEvent
]
export const resolutionsVotingAbi = [
 {
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "owner",
    "type": "address"
   }
  ],
  "name": "OwnableInvalidOwner",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "account",
    "type": "address"
   }
  ],
  "name": "OwnableUnauthorizedAccount",
  "type": "error"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "hashDescription",
    "type": "string"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "voteId",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "startDate",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "endDate",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "adminAddress",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "enum ResolutionsVoting.Role",
    "name": "role",
    "type": "uint8"
   },
   {
    "indexed": false,
    "internalType": "bool",
    "name": "isEnabled",
    "type": "bool"
   }
  ],
  "name": "VoteCompleted",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "hashDescription",
    "type": "string"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "voteId",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "startDate",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "endDate",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "adminAddress",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "enum ResolutionsVoting.Role",
    "name": "role",
    "type": "uint8"
   },
   {
    "indexed": false,
    "internalType": "bool",
    "name": "isEnabled",
    "type": "bool"
   }
  ],
  "name": "VoteCreatedActivated",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "voteId",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "voterAddress",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "bool",
    "name": "isRegistered",
    "type": "bool"
   },
   {
    "indexed": false,
    "internalType": "enum ResolutionsVoting.Role",
    "name": "role",
    "type": "uint8"
   },
   {
    "indexed": false,
    "internalType": "string",
    "name": "voteChoice",
    "type": "string"
   }
  ],
  "name": "Voted",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "address",
    "name": "voterAddress",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "bool",
    "name": "isRegistered",
    "type": "bool"
   },
   {
    "indexed": false,
    "internalType": "enum ResolutionsVoting.Role",
    "name": "role",
    "type": "uint8"
   }
  ],
  "name": "VoterRegistered",
  "type": "event"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_hashDescription",
    "type": "string"
   },
   {
    "internalType": "uint256",
    "name": "_startDate",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "_endDate",
    "type": "uint256"
   }
  ],
  "name": "addVote",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_addr",
    "type": "address"
   },
   {
    "internalType": "enum ResolutionsVoting.Role",
    "name": "_role",
    "type": "uint8"
   }
  ],
  "name": "addVoter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "getCurrentVote",
  "outputs": [
   {
    "components": [
     {
      "internalType": "string",
      "name": "hashDescription",
      "type": "string"
     },
     {
      "internalType": "uint256",
      "name": "startDate",
      "type": "uint256"
     },
     {
      "internalType": "uint256",
      "name": "endDate",
      "type": "uint256"
     },
     {
      "internalType": "bool",
      "name": "isEnabled",
      "type": "bool"
     }
    ],
    "internalType": "struct ResolutionsVoting.Vote",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_addr",
    "type": "address"
   }
  ],
  "name": "getRegisteredVoter",
  "outputs": [
   {
    "components": [
     {
      "internalType": "bool",
      "name": "isRegistered",
      "type": "bool"
     },
     {
      "internalType": "bool",
      "name": "hasVoted",
      "type": "bool"
     },
     {
      "internalType": "enum ResolutionsVoting.Role",
      "name": "role",
      "type": "uint8"
     },
     {
      "internalType": "string",
      "name": "voteChoice",
      "type": "string"
     }
    ],
    "internalType": "struct ResolutionsVoting.Voter",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "getRegisteredVoterForVoter",
  "outputs": [
   {
    "components": [
     {
      "internalType": "bool",
      "name": "isRegistered",
      "type": "bool"
     },
     {
      "internalType": "bool",
      "name": "hasVoted",
      "type": "bool"
     },
     {
      "internalType": "enum ResolutionsVoting.Role",
      "name": "role",
      "type": "uint8"
     },
     {
      "internalType": "string",
      "name": "voteChoice",
      "type": "string"
     }
    ],
    "internalType": "struct ResolutionsVoting.Voter",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_voteId",
    "type": "uint256"
   }
  ],
  "name": "getVote",
  "outputs": [
   {
    "components": [
     {
      "internalType": "string",
      "name": "hashDescription",
      "type": "string"
     },
     {
      "internalType": "uint256",
      "name": "startDate",
      "type": "uint256"
     },
     {
      "internalType": "uint256",
      "name": "endDate",
      "type": "uint256"
     },
     {
      "internalType": "bool",
      "name": "isEnabled",
      "type": "bool"
     }
    ],
    "internalType": "struct ResolutionsVoting.Vote",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_voteId",
    "type": "uint256"
   },
   {
    "internalType": "address",
    "name": "_addr",
    "type": "address"
   }
  ],
  "name": "getVotedVoter",
  "outputs": [
   {
    "components": [
     {
      "internalType": "bool",
      "name": "isRegistered",
      "type": "bool"
     },
     {
      "internalType": "bool",
      "name": "hasVoted",
      "type": "bool"
     },
     {
      "internalType": "enum ResolutionsVoting.Role",
      "name": "role",
      "type": "uint8"
     },
     {
      "internalType": "string",
      "name": "voteChoice",
      "type": "string"
     }
    ],
    "internalType": "struct ResolutionsVoting.Voter",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_voteId",
    "type": "uint256"
   }
  ],
  "name": "getVotedVoterForVoter",
  "outputs": [
   {
    "components": [
     {
      "internalType": "bool",
      "name": "isRegistered",
      "type": "bool"
     },
     {
      "internalType": "bool",
      "name": "hasVoted",
      "type": "bool"
     },
     {
      "internalType": "enum ResolutionsVoting.Role",
      "name": "role",
      "type": "uint8"
     },
     {
      "internalType": "string",
      "name": "voteChoice",
      "type": "string"
     }
    ],
    "internalType": "struct ResolutionsVoting.Voter",
    "name": "",
    "type": "tuple"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "owner",
  "outputs": [
   {
    "internalType": "address",
    "name": "",
    "type": "address"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_voteChoice",
    "type": "string"
   }
  ],
  "name": "setVoteChoice",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "tallyVotes",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "voteId",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 }
] as const;

// Authorities
export const authorities = ["USER", "ADMIN"];

// Vote types 
export const voteTypes = [{ type: "RESOLUTIONS", title: "Resolutions" }, { type: "CANDIDATES_PROPOSALS", title: "Candidats ou propositions" }, { type: "ELECTIONS", title: "Elections" }];

export const voteTemporality = [{ type: "LIVE", title: "Vote live" }, { type: "PLANNED", title: "Vote programmé" }];

// Admin users path
export const adminUserPath = "/admin/user";

export const adminVotePath = "/admin/vote";

export const adminInvitePath = "/admin/invite";

export const adminDashboardPath = "/admin/dashboard";

export const userSupportPath = "/profile/support";

export const profilePath = "/profile";

export const reportPath = "/report";

// Auth
export const authSignInPath = "/auth/signin";

// Sepolia
export const NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL = process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_BASE_URL;

// Email
export const NEXT_PUBLIC_RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;