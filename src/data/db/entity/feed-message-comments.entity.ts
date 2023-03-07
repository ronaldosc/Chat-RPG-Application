import { DatetimeRegisterModel, ProtoUser } from '@model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeedMessage } from './feed-message.entity';
import { User } from './user.entity';

@Entity('feed-message-comments')
export class FeedMessageComments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  feed_message!: FeedMessage;

  @Column(() => User)
  author!: ProtoUser;

  @Column()
  content!: string;

  @Column()
  registers!: DatetimeRegisterModel;
}
