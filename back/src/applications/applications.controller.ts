import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateApplicationDto } from 'src/models/create-application-dto';
import { ReadApplicationDto } from 'src/models/read-application-dto';
import { ApplicationsService } from './applications.service';
import { ApplicationsEntity } from './entities/applications.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  getAllApplications(): Promise<ApplicationsEntity[]> {
    return this.applicationsService.getAllApplications();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.applicationsService.getApplicationById(id);
  }

  @Get('/manage/:status')
  //@UseGuards(AuthGuard())
  getApplicationsByStatus(@Param('status') status: string) {
    return this.applicationsService.getApplicationsByStatus(status);
  }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(createApplicationDto);
  }

  @Patch('/manage/:id')
  update(@Param('id') id: string, @Body('status') status: string) {
    return this.applicationsService.changeApplicationStatus(id, status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.applicationsService.deleteApplication(id);
  }
}
