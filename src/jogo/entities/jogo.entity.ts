import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NumericTransformer } from "../../util/numericTransformer";

@Entity({name: "tb_jogos"}) 
export class Jogo{

    @PrimaryGeneratedColumn()// id INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 100, nullable: false}) //VARCHAR(100) NOT NULL
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    value: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "int"})
    quantity: number

    @UpdateDateColumn()
    date: Date

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Column({length: 500, nullable: false}) 
    image_path: string




}