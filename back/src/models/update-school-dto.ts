import { PartialType } from '@nestjs/mapped-types';
import { ReadSchoolDto } from './read-school-dto';

export class UpdateSchoolDto extends PartialType(ReadSchoolDto){}