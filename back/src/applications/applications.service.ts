import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from 'src/models/create-application-dto';
import { ApplicationsEntity } from './entities/applications.entity';
import { ApplicationsRepository } from './repositories/applications-repository';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationsRepository)
    private readonly applicationsRepository: ApplicationsRepository,
  ) {}

  async getAllApplications(): Promise<ApplicationsEntity[]> {
    return await this.applicationsRepository.find();
  }

  async getApplicationById(id: string): Promise<ApplicationsEntity> {
    return await this.applicationsRepository.findOne(id);
  }

  async createApplication(
    application: CreateApplicationDto,
  ): Promise<ApplicationsEntity> {
    application.personalDetails.studentnumber =
      await this.generateStudentNumber();

    let app = new ApplicationsEntity();
    app.data = {
      ...application,
    };

    return await this.applicationsRepository.save(app);
  }

  async deleteApplication(studentnumber: string): Promise<any> {
    return this.applicationsRepository.delete(studentnumber);
  }

  async generateStudentNumber() {
    return 'S22010000';
  }
}
