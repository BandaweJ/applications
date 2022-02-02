import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateApplicationDto } from '../../models/create-application-dto';

@Entity('applications')
export class ApplicationsEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: 'P' })
  status: string;

  @Column('simple-json')
  data: CreateApplicationDto;
}
