import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Jogo, JogoDocument } from "../schemas/jogo.schema";
import { CreateJogoDto, UpdateJogoDto } from "../dto/jogo.dto";


@Injectable()
export class JogoService {

    constructor(
        @InjectModel(Jogo.name) // Certifique-se de que o nome do modelo está correto
        private jogoModel: Model<JogoDocument>,
        //adeicione depois o relacionamento aqui
    ) { }

    //Criando metodo para Listar Todos
    async findAll(): Promise<Jogo[]> {
        return this.jogoModel.find().populate('categoria').exec();
    }

    //Criando metodo para Procurar por ID
    async findById(id: string): Promise<Jogo> {
        const jogo = await this.jogoModel.findById(id).populate('categoria').exec();
        if (!jogo)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)
        return jogo;
    }

    //Criando metodo para Procurar por Nome do jogo
    async findByName(name: string): Promise<Jogo[]> {
        const jogos = await this.jogoModel.find({ name: new RegExp(name, 'i') }).populate('categoria').exec();
        if (!jogos)
            throw new HttpException(
                'Nenhum jogo encontrado com o nome informado',
                HttpStatus.NOT_FOUND,
            );
        return jogos;
    };

    //Criando metodo para Salvar o Jogo
    async create(dto: CreateJogoDto): Promise<Jogo> {
        const jogo = new this.jogoModel(dto);
        return jogo.save();     
    }

    //Criando metodo para Atualizar dados dos jogos
    async update(id: string, dto: UpdateJogoDto): Promise<Jogo> {
        const jogo = await this.jogoModel.findByIdAndUpdate(id, dto, { new: true }).populate('categoria').exec();
        if (!jogo) {
            throw new HttpException('Jogo não encontrado', HttpStatus.NOT_FOUND);
        }
        return jogo;
    }

    async delete(id: string): Promise<void> {
        const result = await this.jogoModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new HttpException('Jogo não encontrado', HttpStatus.NOT_FOUND);
        }
    }
}