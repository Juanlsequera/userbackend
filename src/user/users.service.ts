import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Request } from 'express';
import UserDto from './dtos/user.dto';
import LoginAuthDto from './dtos/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const { password } = userDto;
    const plainToHash = await hash(password, 10);
    userDto = { ...userDto, password: plainToHash };
    return this.userModel.create(userDto);
  }

  async findAll(request: Request): Promise<User[]> {
    return this.userModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new BadRequestException('User not found (login)');
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('Validation Error', HttpStatus.FORBIDDEN);

    const payload = {
      id: findUser._id,
      name: findUser.name,
      lastname: findUser.lastname,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove({ _id: id }).exec();
    return `${user.name} has been eliminated`;
  }

  // async findOne(id: string): Promise<User> {
  //   return await this.userModel.findOne({ _id: id }).exec();
  // }

  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
  //     new: true,
  //   });
  // }
}
