import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateApplicationDto } from 'src/models/create-application-dto';
import { ReadApplicationDto } from 'src/models/read-application-dto';
import { ApplicationsService } from './applications.service';
import { ApplicationsEntity } from './entities/applications.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  getAllApplications(): Promise<ApplicationsEntity[]> {
    return this.applicationsService.getAllApplications();
  }

  @Get('/practice')
  getId() {
    return this.applicationsService.generateStudentNumber();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.applicationsService.getApplicationById(id);
  }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(createApplicationDto);
  }

  update() {}

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.applicationsService.deleteApplication(id);
  }
}
