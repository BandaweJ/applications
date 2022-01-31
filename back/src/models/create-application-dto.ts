import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ReadApplicationDto } from './read-application-dto';

export class CreateApplicationDto extends PartialType(
  OmitType(ReadApplicationDto, ['id'] as const),
) {}
