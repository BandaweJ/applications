import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsController } from './schools/schools.controller';

@Module({
  imports: [],
  controllers: [AppController, SchoolsController],
  providers: [AppService],
})
export class AppModule {}
