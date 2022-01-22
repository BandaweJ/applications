import { EntityRepository, Repository } from "typeorm";
import { SchoolsEntity } from '../entities/schools.entity';
import { CreateSchoolDto } from '../../models/create-school-dto';


@EntityRepository(SchoolsEntity)
export class SchoolsRepository extends Repository<SchoolsEntity>{
   
}