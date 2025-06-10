import { Module } from "@nestjs/common";
import { JogoController } from "./controllers/jogo.controller";
import { JogoService } from "./services/jogo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Jogo, JogoSchema } from "./schemas/jogo.schema";


@Module({
    imports: [MongooseModule.forFeature([
        { name: Jogo.name, schema: JogoSchema}
    ])],
    providers: [JogoService],
    controllers: [JogoController],
    exports: [JogoService, MongooseModule] 
})
export class JogoModule{}