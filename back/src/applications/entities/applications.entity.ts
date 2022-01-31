import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateApplicationDto } from '../../models/create-application-dto';

@Entity('applications')
export class ApplicationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  data: CreateApplicationDto;
}
