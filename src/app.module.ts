import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaModule } from './categoria/categoria.module';
import { JogoModule } from './jogo/jogo.module';


@Module({
  imports: [
    // 1. Configura o ConfigModule primeiro
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
      envFilePath: '.env', // Caminho do arquivo de variáveis de ambiente
    }),
     // 2. MongooseModule agora usa o ConfigService para obter a URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),      
      }),
      inject: [ConfigService], // Garante que ConfigService seja injetado no useFactory
    }),
    CategoriaModule,
    JogoModule,
  ],

  
  controllers: [],
  providers: [],
})
export class AppModule {}
