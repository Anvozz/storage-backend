import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { GetuserDTO } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  /**
   *
   */
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, GetuserDTO);
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, User, CreateUserDto);
      createMap(mapper, UpdateUserDto, User);
    };
  }
}
