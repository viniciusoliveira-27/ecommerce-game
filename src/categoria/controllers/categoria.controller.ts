import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseFilters } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../schemas/categoria.schema'; // Importa o esquema/modelo da categoria
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';


@Controller("categoria")
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
    findById(@Param("id") id: string): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get("/categoria/:categoria")
    @HttpCode(HttpStatus.OK)
    findByCategory(@Param("categoria") categoria: string): Promise<Categoria[]> {
        return this.categoriaService.findByCategory(categoria);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateCategoriaDto): Promise<Categoria> {
        return this.categoriaService.create(dto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() dto: UpdateCategoriaDto): Promise<Categoria> {
        return this.categoriaService.update(dto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: string) {
        return this.categoriaService.delete(id);
    }

}