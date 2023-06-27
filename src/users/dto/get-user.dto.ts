import { AutoMap } from '@automapper/classes';

export class GetuserDTO {
  @AutoMap()
  id: number;

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
}
