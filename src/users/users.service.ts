import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { User } from './entities/user.entity';
import { GetuserDTO } from './dto/get-user.dto';
import { ServiceResponse } from 'src/lib/ServiceResponse';
import * as bcrypt from 'bcrypt';
import { HttpErrorException } from 'src/lib/HttpErrorException';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<ServiceResponse<CreateUserDto | undefined>> {
    const response = new ServiceResponse<CreateUserDto | undefined>();
    try {
      const { tel, email, username } = createUserDto;
      /**
       * Check if database has email/tel/username as same then reject
       */
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('username = :username ', { username })
        .orWhere('email = :email', { email })
        .orWhere('tel = :tel', { tel })
        .execute();
      if (user.length >= 1)
        throw new HttpException(
          'Email/Tel/Username already exist',
          HttpStatus.BAD_REQUEST,
        );
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
      const entity = this.classMapper.map(createUserDto, CreateUserDto, User);
      await this.classMapper.mapAsync(
        await this.userRepository.save(entity),
        User,
        CreateUserDto,
      );
      response.message = 'CREATE_USER_SUCCESSFULLY';
      response.success = true;
    } catch (error) {
      return HttpErrorException(error);
    }
    return response;
  }

  async findAll(): Promise<ServiceResponse<GetuserDTO[]>> {
    const response = new ServiceResponse<GetuserDTO[]>();
    try {
      response.data = await this.classMapper.mapArrayAsync(
        await this.userRepository.find(),
        User,
        GetuserDTO,
      );
    } catch (error) {
      return HttpErrorException(error);
    }
    return response;
  }

  async findOne(id: string): Promise<ServiceResponse<GetuserDTO>> {
    const response = new ServiceResponse<GetuserDTO>();
    if (!id)
      throw new HttpException('DELETE_ERROR_ID_EMPTY', HttpStatus.BAD_REQUEST);
    try {
      const data = await this.classMapper.mapAsync(
        await this.userRepository.findOne({
          where: {
            id: id,
          },
        }),
        User,
        GetuserDTO,
      );
      if (!data)
        throw new HttpException('GET_USER_ID_NOTFOUND', HttpStatus.NOT_FOUND);
      response.data = data;
    } catch (error) {
      return HttpErrorException(error);
    }
    return response;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ServiceResponse<string | undefined>> {
    const response = new ServiceResponse<string | undefined>();
    if (!id)
      throw new HttpException('UPDATE_ERROR_ID_EMPTY', HttpStatus.BAD_REQUEST);
    try {
      updateUserDto.id = id;
      const entity = this.classMapper.map(updateUserDto, UpdateUserDto, User);
      await this.userRepository.update(id, entity);
      response.message = 'UPDATE_USER_SUCCESSFULLY';
      response.success = true;
    } catch (error) {
      return HttpErrorException(error);
    }
    return response;
  }

  async remove(id: string): Promise<ServiceResponse<string | undefined>> {
    const response = new ServiceResponse<string | undefined>();
    if (!id)
      throw new HttpException('DELETE_ERROR_ID_EMPTY', HttpStatus.BAD_REQUEST);
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!user)
        new HttpException('DELETE_ERROR_ID_NOTFOUND', HttpStatus.NOT_FOUND);
      await this.userRepository.delete(id);
      response.message = 'DELETE_USER_SUCCESSFULLY';
    } catch (error) {
      return HttpErrorException(error);
    }
    return response;
  }
}
