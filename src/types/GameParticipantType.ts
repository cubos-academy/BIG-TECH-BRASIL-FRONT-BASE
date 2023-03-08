import { ParticipantType } from "./ParticipantType";

export type GameParticipantType = {
  participant: ParticipantType;
  votes: number;
  percent: number;
};
