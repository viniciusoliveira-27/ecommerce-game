import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Jogo } from "./entities/jogo.entity";
import { JogoController } from "./controllers/jogo.controller";
import { JogoService } from "./services/jogo.service";


@Module({
    imports: [TypeOrmModule.forFeature([Jogo])],
    providers: [JogoService],
    controllers: [JogoController],
    exports: [TypeOrmModule]
})
export class JogoModule{}