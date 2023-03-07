import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feed-room')
export class FeedRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @Column()
  // title!: string;
}
