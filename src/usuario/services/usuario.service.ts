import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { differenceInYears } from 'date-fns';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }


    async create(usuario: Usuario): Promise<Usuario> {

        const idade = differenceInYears(new Date(), usuario.data_nascimento);    

        if(idade < 18){
            throw new HttpException("Usuario menor de 18 anos, cadastro não autorizado.", HttpStatus.BAD_REQUEST);
        }        
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        const idade = differenceInYears(new Date(), usuario.data_nascimento);    

        if(idade < 18){
            throw new HttpException("Usuario não pode ter menos que 18 anos, colocar uma data valida.", HttpStatus.BAD_REQUEST);
        }      

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

}