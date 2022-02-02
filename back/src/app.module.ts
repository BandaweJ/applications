import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';

import { SchoolsModule } from './schools/schools.module';
import { ApplicationsModule } from './applications/applications.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'root',
      password: '',
      database: 'applications',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }
    ),
    SchoolsModule,
    ApplicationsModule,
    TrackModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
