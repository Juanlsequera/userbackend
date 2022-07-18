import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import UserDto from './dtos/user.dto';
import UserService from './users.service';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id.pipe';
import LoginAuthDto from './dtos/login-auth.dto';

@Controller('users')
@ApiTags('user')
export default class usersController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get('/all')
  findAll(@Req() request: Request) {
    return this.userService.findAll(request);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'User logged in with success',
    type: LoginAuthDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Password Incorrect',
  })
  async login(@Body() loginDto: LoginAuthDto) {
    return this.userService.login(loginDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Should be an id of a post that exists in the database, use the users/all to get database id',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.remove(id);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.userService.update(id, updateUserDto);
  // }
}
