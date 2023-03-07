import { DatetimeRegisterModel, ProtoUser } from '@model';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeedMessage } from './feed-message.entity';
import { PlayerCharacter } from './player-character.entity';
import { User } from './user.entity';

@Entity('chat-room')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  feed_message_origin!: FeedMessage;

  @Column(() => User)
  owner!: ProtoUser;

  @Column()
  title!: string;

  @Column()
  number_of_players!: number;

  @OneToMany(
    () => FeedMessage,
    (feedMessages) => {
      feedMessages.player_characters;
    },
  ) //faltou deleted
  player_characters!: PlayerCharacter[];

  @Column()
  waiting_for_response!: boolean;

  @Column()
  registers!: DatetimeRegisterModel;
}
