import { DatetimeRegisterModel, ProtoUser } from '@model';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { PlayerCharacter } from './player-character.entity';

@Entity('chat-message')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  chat_room_id!: ChatRoom;

  @Column()
  author!: ProtoUser;

  @Column()
  content!: string;

  @ManyToOne(() => PlayerCharacter, (player) => player.character_id)
  directed_to!: number;

  @Column(() => Array<object>)
  choices!: {
    choice_content: string;
    max_dice_value: number;
    selected: boolean;
  };

  @Column()
  registers!: Omit<DatetimeRegisterModel, 'updated_at'>;
}
