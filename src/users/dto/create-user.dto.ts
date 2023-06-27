import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserLevelEnum } from '../entities/user.entity';

export class CreateUserDto {
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  tel: string;
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @ApiProperty()
  password: string;
  @AutoMap()
  @ApiProperty()
  firstname: string;
  @AutoMap()
  @ApiProperty()
  lastname: string;
  @AutoMap()
  @ApiProperty()
  usergroup: UserLevelEnum;
}
