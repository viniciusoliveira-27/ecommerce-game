import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './jogo/entities/jogo.entity';
import { JogoModule } from './jogo/jogo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_ecommerce_games',
      entities: [Jogo],
      synchronize: true,
    }),
    JogoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
