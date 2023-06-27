import { AutoMap } from '@automapper/classes';
import { UserLevelEnum } from '../entities/user.entity';

export class GetuserDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  tel: string;

  @AutoMap()
  username: string;

  @AutoMap()
  firstname: string;

  @AutoMap()
  lastname: string;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  @AutoMap()
  usergroup: UserLevelEnum;
}
