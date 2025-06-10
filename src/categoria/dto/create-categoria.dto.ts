import { IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  categoria: string;
}
// O DTO (Data Transfer Object) é usado para definir a estrutura dos dados que serão enviados na requisição de criação de uma nova categoria.
// Ele garante que o campo "categoria" não esteja vazio, utilizando o decorador @IsNotEmpty do class-validator.
// Isso ajuda a validar os dados de entrada antes de serem processados pelo serviço ou controlador, garantindo que a categoria seja sempre fornecida ao criar uma nova categoria.