import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsEntity } from './entities/applications.entity';
import { ApplicationsRepository } from './repositories/applications-repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationsRepository])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
