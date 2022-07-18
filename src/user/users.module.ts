import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import usersController from './users.controller';
import UserService from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from 'src/const/jwt.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [usersController],
  providers: [UserService],
})
export default class UserModule {}
