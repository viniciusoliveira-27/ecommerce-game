import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jogo } from "../entities/jogo.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class JogoService {

    constructor(
        @InjectRepository(Jogo)
        private jogoRepository: Repository<Jogo>
        //adeicione depois o relacionamento aqui
    ) { }

    //Criando metodo para Listar Todos
    async findAll(): Promise<Jogo[]> {
        return this.jogoRepository.find(); //SELECT * FROM tb_postagens;
    }
    //Criando metodo para Procurar por ID
    async findById(id: number): Promise<Jogo> {
        //dispara dentro do BD SELECT*FROM tb_jogos WHERE id = ?;
        const jogo = await this.jogoRepository.findOne({
            where: {
                id
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
            }
        });
    }

    // async findByValue(value: number): Promise<Jogo[]>{

    // }

    //Criando metodo para Salvar o Jogo
    async create(jogo: Jogo): Promise<Jogo> {
        return await this.jogoRepository.save(jogo);
    }

    //Criando metodo para Atualizar dados dos jogos
    async update(jogo: Jogo): Promise<Jogo>{

        await this.findById(jogo.id)

        return await this.jogoRepository.save(jogo);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.jogoRepository.delete(id);
    }
    







}