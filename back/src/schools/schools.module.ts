import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { SchoolsEntity } from './entities/schools.entity';
import { UsersEntity } from './entities/users.entity';
import { SchoolsRepository } from './repositories/schools.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolsRepository, UsersRepository])],
    controllers: [SchoolsController],
    providers: [SchoolsService]
})
export class SchoolsModule {}
