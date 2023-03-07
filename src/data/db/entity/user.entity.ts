import { DatetimeRegisterModel, UserContactModel, UserModel } from '@model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity implements UserModel{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  contact!: UserContactModel;

  @Column()
  registers!: DatetimeRegisterModel

  
  // @Column(() => Array)
  // followers!: UserBaseType[];

  // @Column(() => Array)
  // following!: UserBaseType[];

  // @Column(() => Array)
  // blocked_users!: UserBaseType[];

  // @Column({ unique: true })
  // player_code!: string;
}
