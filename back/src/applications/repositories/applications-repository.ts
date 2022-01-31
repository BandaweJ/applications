import { EntityRepository, Repository } from 'typeorm';
import { ApplicationsEntity } from '../entities/applications.entity';

@EntityRepository(ApplicationsEntity)
export class ApplicationsRepository extends Repository<ApplicationsEntity> {}
