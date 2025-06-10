import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateJogoDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly value: number;

  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @IsNotEmpty()
  readonly image_path: string;

  @IsString()
  @IsNotEmpty()
  categoria: string; // ObjectId como string
}

export class UpdateJogoDto {
  @IsNotEmpty()
  readonly id: string; // ID do jogo a ser atualizado

  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly value: number;

  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @IsNotEmpty()
  readonly image_path: string;

  @IsNotEmpty()
  readonly categoria: string; // ObjectId como string
}