import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
