import { PlayerCharacterModel, ProtoUser } from '@model';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class PlayerCharacter extends BaseEntity implements PlayerCharacterModel {
  @PrimaryGeneratedColumn('increment')
  character_id!: number;

  @Column()
  character_name!: string;

  @Column({ nullable: true })
  player_id!: ProtoUser;

  @Column({ nullable: true })
  deleted?: boolean;
}
