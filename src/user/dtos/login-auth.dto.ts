import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginAuthDto {
  @ApiProperty({
    example: 'batman@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '12345678',
  })
  @MinLength(4)
  @MaxLength(8)
  @IsNotEmpty()
  readonly password: string;
}
