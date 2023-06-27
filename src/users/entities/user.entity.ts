import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum UserLevelEnum {
  SUPERADMIN = 1,
  ADMIN,
  MODERATOR,
  STAFF,
  USER,
}

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column()
  tel: string;

  @AutoMap()
  @Column()
  username: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column()
  firstname: string;

  @AutoMap()
  @Column()
  lastname: string;

  @AutoMap()
  @Column({ default: false })
  isActive: boolean;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @Column({ enum: UserLevelEnum })
  usergroup: UserLevelEnum;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
