import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ReadSchoolDto } from './read-school-dto';

export class CreateSchoolDto extends PartialType(OmitType(ReadSchoolDto, ['id'] as const)) {}