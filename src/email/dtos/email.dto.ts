import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class EmailDto {
  @ApiProperty({
    example: 'pedrorodriguez12@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
