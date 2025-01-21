import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            relations: {
                jogo: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {
        //dispara dentro do BD SELECT*FROM tb_jogos WHERE id = ?;
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: { //habilitando o relacionamento na consulta
                jogo: true
            }
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return categoria;
    }
    //Criando metodo para Procurar por Nome do jogo
    async findByCategory(category: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                category: ILike(`%${category}%`) //ILike = case insensitive
            },
            relations: { //habilitando o relacionamento na consulta
                jogo: true
            }
        });
    }


    //Criando metodo para Salvar o Jogo
    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    //Criando metodo para Atualizar dados dos jogos
    async update(categoria: Categoria): Promise<Categoria> {

        await this.findById(categoria.id)

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.categoriaRepository.delete(id);
    }


}