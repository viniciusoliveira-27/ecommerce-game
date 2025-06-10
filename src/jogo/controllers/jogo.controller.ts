import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { JogoService } from "../services/jogo.service";
import { Jogo } from "../schemas/jogo.schema";
import { CreateJogoDto, UpdateJogoDto } from "../dto/jogo.dto";

@Controller("/jogos")
export class JogoController {

    constructor(
        private readonly jogoService: JogoService
    ) { }
    //chamando o metodo criado no service para ser controlado aqui.
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Jogo[]> {
        return this.jogoService.findAll();
    }


    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id") id: string): Promise<Jogo> {
        return this.jogoService.findById(id);
    }

    @Get("/name/:name")
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("name") name: string): Promise<Jogo[]> {
        return this.jogoService.findByName(name);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateJogoDto): Promise<Jogo> {
        return this.jogoService.create(dto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() id: string, dto: UpdateJogoDto): Promise<Jogo> {
        return this.jogoService.update(id, dto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: string) {
        return this.jogoService.delete(id);
    }


}