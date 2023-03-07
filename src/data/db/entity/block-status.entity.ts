import { BlockingStatusModel, UserModel } from '@model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blocking-status')
export class BlockingStatus implements BlockingStatusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  blocked_user!: UserModel;

  @Column()
  blocking_users!: UserModel[];
}
