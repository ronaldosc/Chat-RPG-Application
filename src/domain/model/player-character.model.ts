import { ProtoUser } from './user.model';

export interface PlayerCharacterModel {
  character_id: number;
  character_name: string;
  player_id: ProtoUser | null;
  deleted?: boolean | null;
}
