import { DatetimeRegisterModel, ProtoUser } from '@model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeedMessage } from './feed-message.entity';
import { User } from './user.entity';

@Entity('feed-message-likes')
export class FeedMessageLikes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  feed_message!: FeedMessage;

  @Column(() => User)
  author!: ProtoUser;

  @Column()
  registers!: Pick<DatetimeRegisterModel, 'created_at'>;
}
