import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './jogo/entities/jogo.entity';
import { JogoModule } from './jogo/jogo.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_ecommerce_games',
      entities: [Jogo, Categoria],
      synchronize: true,
      logging: true,
    }),
    JogoModule, CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
