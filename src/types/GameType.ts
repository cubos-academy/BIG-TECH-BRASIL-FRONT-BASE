import { GameParticipantType } from "./GameParticipantType";

export type GameType = {
  id: string;
  isActive: boolean;
  createdAt: string;
  gameParticipants: GameParticipantType[];
};
