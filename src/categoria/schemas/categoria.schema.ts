
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'; // Importe Types para ObjectId

// CREATE TABLE tb_categorias()
export type CategoriaDocument = Categoria & Document;

@Schema({ collection: 'tb_categorias' })
export class Categoria {

  @Prop({ required: true, trim: true })
  categoria: string;

}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);