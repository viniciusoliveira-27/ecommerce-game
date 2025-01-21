import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jogo } from "../entities/jogo.entity";
import { DeleteResult, ILike, LessThan, LessThanOrEqual, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class JogoService {

    constructor(
        @InjectRepository(Jogo)
        private jogoRepository: Repository<Jogo>,
        private categoriaService: CategoriaService
        //adeicione depois o relacionamento aqui
    ) { }

    //Criando metodo para Listar Todos
    async findAll(): Promise<Jogo[]> {
        return this.jogoRepository.find({
            relations: {
                categoria: true
            }
        }); 
    }
    //Criando metodo para Procurar por ID
    async findById(id: number): Promise<Jogo> {
        //dispara dentro do BD SELECT*FROM tb_jogos WHERE id = ?;
        const jogo = await this.jogoRepository.findOne({
            where: {
                id
            },
            relations: { 
                categoria: true
            }
        });

        if (!jogo)
            throw new HttpException('Jogo não encontrada', HttpStatus.NOT_FOUND)

        return jogo;
    }
    //Criando metodo para Procurar por Nome do jogo
    async findByName(name: string): Promise<Jogo[]> {
        return this.jogoRepository.find({
            where: {
                name: ILike(`%${name}%`) //ILike = case insensitive
            },
            relations: { 
                categoria: true
            }
        });
    }

    async findByLessValue(value: number): Promise<Jogo[]> {
        const jogos = await this.jogoRepository.find({
            where: {
                value: LessThanOrEqual(value),
            },
            relations: {
                categoria: true, // Carrega a relação com a categoria
            },
            order: {
                value: 'ASC', // Ordena pelo preço em ordem crescente
            },
        });

        if (!jogos || jogos.length === 0) {
            throw new HttpException(
                'Nenhum jogo encontrado com o preço informado',
                HttpStatus.NOT_FOUND,
            );
        }
        return jogos
    }

    //Criando metodo para Salvar o Jogo
    async create(jogo: Jogo): Promise<Jogo> {

        await this.categoriaService.findById(jogo.categoria.id)

        return await this.jogoRepository.save(jogo);
    }

    //Criando metodo para Atualizar dados dos jogos
    async update(jogo: Jogo): Promise<Jogo>{

        await this.findById(jogo.id)

        await this.categoriaService.findById(jogo.categoria.id)

        return await this.jogoRepository.save(jogo);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.jogoRepository.delete(id);
    }
    







}