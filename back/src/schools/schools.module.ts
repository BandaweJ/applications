import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';

import { SchoolsRepository } from './repositories/schools.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolsRepository])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
