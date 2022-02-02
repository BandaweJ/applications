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
    let stid = await this.generateStudentNumber();

    application.personalDetails.studentnumber = stid;

    let app = new ApplicationsEntity();

    app.id = stid;
    app.data = {
      ...application,
    };

    return await this.applicationsRepository.save(app);
  }

  async deleteApplication(studentnumber: string): Promise<any> {
    return this.applicationsRepository.delete(studentnumber);
  }

  async generateStudentNumber() {
    //Format LYYMMNNNC
    let L = 'S';
    let today = new Date();
    let YY = today.getFullYear().toString().substring(2);
    let month = today.getMonth().toString();
    let MM = '';
    month.length === 1 ? (MM = '0' + month) : (MM = month);
    let NNN = '000';
    let currentId: ApplicationsEntity[];
    try {
      currentId = await this.applicationsRepository.find({
        select: ['id'],
        order: {
          id: 'DESC',
        },
        take: 1,
      });
    } catch (err) {
      console.log(err);
    }
    if (currentId.length > 0) {
      let number = +currentId[0].id.substring(5, 8) + 1;
      number.toString().length === 1
        ? (NNN = '00' + number)
        : number.toString().length === 2
        ? (NNN = '0' + number)
        : (NNN = number.toString());
    }

    let newId = L + YY + MM + NNN + this.calculateCheckDigit(YY, MM, NNN);

    return newId;
  }

  calculateCheckDigit(year: string, month: string, number: string) {
    let id: string = year + month + number;
    let result: number = id
      .split('')
      .reduce((sum, current) => sum + +current, 0);

    return Math.floor(result / 7);
  }
}
