import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller("/categorias")
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    //chamando o metodo criado no service para ser controlado aqui.
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }


    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    //tem q transformar a string em Numero
    findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get("/categoria/:categoria")
    @HttpCode(HttpStatus.OK)
    findByCategory(@Param("categoria") categoria: string): Promise<Categoria[]> {
        return this.categoriaService.findByCategory(categoria);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }

}