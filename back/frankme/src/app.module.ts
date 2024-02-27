import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.username,
    password: process.env.password,
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
