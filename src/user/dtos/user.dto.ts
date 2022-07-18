import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678',
  })
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'pedrorodriguez12@gmail.com',
  })
  readonly email: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'Pedro',
  })
  readonly name: string;
  @ApiProperty({
    example: 'Rodriguez',
  })
  @IsNotEmpty()
  readonly lastname: string;
}
