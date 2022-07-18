import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
import UserModule from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    EmailModule,
    PhotosModule,
  ],
})
export class AppModule {}
