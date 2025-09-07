import { SupabaseUserName, Username } from "@/utils/constants";

export type Nullable <T> = T | null;

export interface User {
  id: string;
  email: string;
  username: SupabaseUserName;
  metadata: UserMetadata;
}

export interface UserMetadata {
  displayName: string;
  avatarUrl: string;
  wins: number;
  seconds: number;
  thirds: number;
  saves: number;
  losses: number;
  commanders: string[];
  rounds: Round[];
  bannedCards: string[];
  email_verified?: boolean;
}

export interface Round {
  roundNumber: number;
  tables: Table[];
  bye: Nullable<Username>;
  date: Date;
}

export interface Table {
  bannedCards: string[];
  index: number;
  players: string[];
  winner: string[];
  second: string[];
  losses: string[];
  third: string[];
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  totalPoints: number;
  wins: number;
  seconds: number;
  thirds: number;
  saves: number;
  losses: number;
  gamesPlayed: number;
}
