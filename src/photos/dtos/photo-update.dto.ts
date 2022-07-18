import { IsNotEmpty } from 'class-validator';

export class photoUpdateDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly newName: string;
}
