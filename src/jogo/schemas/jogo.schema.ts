import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categoria } from '../../categoria/schemas/categoria.schema';

export type JogoDocument = Jogo & Document;

@Schema({ collection: 'tb_jogos', timestamps: true })
export class Jogo {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number, min: 0 })
  value: number;

  @Prop({ required: true, type: Number, min: 0 })
  quantity: number;

  @Prop({ required: true, trim: true })
  image_path: string;

  @Prop({ type: Types.ObjectId, ref: Categoria.name, required: true })
  categoria: Categoria | Types.ObjectId; // Referência para o esquema Categoria
  
}

export const JogoSchema = SchemaFactory.createForClass(Jogo);
