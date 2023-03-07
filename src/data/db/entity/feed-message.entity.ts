import { DatetimeRegisterModel, PlayerCharacterModel, ProtoUser } from '@model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeedRoom } from './feed-room.entity';
import { User } from './user.entity';

@Entity('feed-message')
export class FeedMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  feed_room!: FeedRoom;

  @Column(() => User)
  owner!: ProtoUser;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  image!: string;

  @Column()
  number_of_players!: number;

  @Column()
  player_characters!: Omit<PlayerCharacterModel, 'deleted'>[];

  // @Column()
  // tags!: string[];

  @Column()
  number_of_comments!: number;

  @Column()
  number_of_likes!: number;

  @Column()
  registers!: DatetimeRegisterModel;
}

/*  @Column()
  comments!: [];

  @Column()
  reactions!: [];
 */
