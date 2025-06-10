import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // Importa InjectModel do NestJS Mongoose
import { Model } from 'mongoose'; // Importa Model do Mongoose
import { Categoria, CategoriaDocument } from '../schemas/categoria.schema'; // Ajusta o caminho do esquema
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectModel(Categoria.name)
        private categoriaModel: Model<CategoriaDocument>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaModel.find().exec(); //populando o relacionamento com jogos
    }

    async findById(id: string): Promise<Categoria> {
        const categoria = await this.categoriaModel.findById(id).exec(); 
            if (!categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return categoria;
    }
    //Criando metodo para Procurar por Nome do jogo
    async findByCategory(categoria: string): Promise<Categoria[]> {
    // Usa expressão regular ($regex) com a opção 'i' para case-insensitive
    // e popula o campo virtual 'jogo'
    return await this.categoriaModel
      .find({ categoria: { $regex: categoria, $options: 'i' } })
      .exec();
  }


    //Criando metodo para Salvar Categoria
    async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = new this.categoriaModel(dto);
    return categoria.save();
  }

    //Criando metodo para Atualizar dados dos jogos
    async update(dto: UpdateCategoriaDto) : Promise<Categoria> {
        const categoria = await this.categoriaModel.findByIdAndUpdate(dto.id, dto, { new: true }).exec();
        if (!categoria) {
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
        }
        return categoria;
    }

    async delete(id: string): Promise<void> {
        const result = await this.categoriaModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new HttpException('Erro ao deletar: Categoria não encontrada', HttpStatus.NOT_FOUND);
        }
    }


}