import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { UserLevelEnum } from '../entities/user.entity';

export class UpdateUserDto {
  id: string;
  @ApiProperty()
  @AutoMap()
  email: string;
  @ApiProperty()
  @AutoMap()
  tel: string;
  @ApiProperty()
  @AutoMap()
  username: string;
  @ApiProperty()
  @AutoMap()
  firstname: string;
  @ApiProperty()
  @AutoMap()
  lastname: string;
  @ApiProperty()
  @AutoMap()
  isActive: boolean;
  @ApiProperty()
  @AutoMap()
  usergroup: UserLevelEnum;
}
