import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  category?: string;
}
// O DTO (Data Transfer Object) é usado para definir a estrutura dos dados que serão enviados na requisição de atualização de uma categoria.
// Ele garante que o campo "id" não esteja vazio, utilizando o decorador @IsNotEmpty do class-validator.