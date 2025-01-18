import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jogo } from "../../jogo/entities/jogo.entity";

@Entity({ name: "tb_categorias" }) // CREATE TABLE tb_categorias()
export class Categoria {

    @PrimaryGeneratedColumn()// id INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({ length: 255, nullable: false }) //VARCHAR(100) NOT NULL
    category: string;

    @OneToMany(() => Jogo, (jogo) => jogo.categoria)
    jogo: Jogo[];




}