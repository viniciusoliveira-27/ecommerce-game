import { Module } from "@nestjs/common";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Categoria, CategoriaSchema } from "./schemas/categoria.schema";


@Module({
    imports: [MongooseModule.forFeature([
        {name: Categoria.name, schema: CategoriaSchema} // Registra o modelo Mongoose
    ])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [CategoriaService, MongooseModule] // Exporta o serviço e o módulo Mongoose para uso em outros módulos
})
export class CategoriaModule{}