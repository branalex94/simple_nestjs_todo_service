import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { DateUtils } from 'src/utils/dates';
import { StringsUtils } from 'src/utils/strings';

@Injectable()
export class UsersService {
  private _users: User[] = [];
  private _idInt: number = 1;

  create(createUserDto: CreateUserDto) {
    this.validateUserProps(createUserDto);
    const currentDate = DateUtils.getCurrentDate();
    const newUser = new User(
      this._idInt++,
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
      currentDate,
      currentDate,
    );
    this._users.push(newUser);
    const userDto = this.userEntityToDto(newUser);
    return userDto;
  }

  findAll(): UserDto[] {
    return this._users.map((user) => this.userEntityToDto(user));
  }

  findOne(id: number): UserDto {
    const user = this._users.find((user) => user.id == id);
    if (user == undefined) throw new NotFoundException();
    const userDto = this.userEntityToDto(user);
    return userDto;
  }

  findUserEntity(id: number): User {
    if (isNaN(id)) throw new BadRequestException('Invalid user id');
    const user = this._users.find((user) => user.id == id);
    if (user == undefined) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): UserDto {
    const findUser = this._users.find((todo) => todo.id == id);
    if (findUser == undefined) {
      throw new NotFoundException();
    }

    if (updateUserDto.username != undefined) {
      findUser.username = updateUserDto.username;
    }
    if (updateUserDto.email != undefined) {
      findUser.email = updateUserDto.email;
    }
    if (updateUserDto.password != undefined) {
      findUser.password = updateUserDto.password;
    }
    const updatedDate = DateUtils.getCurrentDate();
    findUser.updatedAt = updatedDate;
    const index = this._users.indexOf(findUser);
    this._users[index] = findUser;
    return this.userEntityToDto(findUser);
  }

  remove(id: number): number {
    const findUser = this.findOne(id);
    this._users = this._users.filter((user) => user.id != findUser.id);
    return findUser.id;
  }

  userEntityToDto(user: User): UserDto {
    return new UserDto(user.id, user.username, user.email);
  }

  validateUserProps(user: CreateUserDto) {
    const userExists = this._users.find(
      (item) => item.username == user.username || item.email == user.email,
    );
    if (StringsUtils.isValidEmail(user.email) == false)
      throw new BadRequestException();
    if (userExists != undefined) throw new BadRequestException();
  }
}
