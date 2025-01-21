import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { JogoService } from "../services/jogo.service";
import { Jogo } from "../entities/jogo.entity";

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
    //tem q transformar a string em Numero
    findById(@Param("id", ParseIntPipe) id: number): Promise<Jogo> {
        return this.jogoService.findById(id);
    }

    @Get("/name/:name")
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("name") name: string): Promise<Jogo[]> {
        return this.jogoService.findByName(name);
    }

    @Get("/value/:value")
    @HttpCode(HttpStatus.OK)
    findByLessValue(@Param("value", ParseIntPipe) value: number): Promise<Jogo[]> {
        return this.jogoService.findByLessValue(value);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() jogo: Jogo): Promise<Jogo> {
        return this.jogoService.create(jogo);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() jogo: Jogo): Promise<Jogo> {
        return this.jogoService.update(jogo);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.jogoService.delete(id);
    }


}