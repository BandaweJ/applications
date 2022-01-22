import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SchoolsEntity } from './entities/schools.entity';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from '../models/create-school-dto';
import { UpdateSchoolDto } from '../models/update-school-dto';

@Controller('schools')
export class SchoolsController {

    constructor(private schoolsService: SchoolsService){}

    @Get()
    getAllSchools(){
        return this.schoolsService.getAllSchools();
    }

    @Get('/:id')
    getSchoolById(@Param('id') id: string){
        return this.schoolsService.getSchoolById(id);
    }

    @Post()
    createSchool(@Body() createSchoolDto: CreateSchoolDto){
        //return 'in schools controller';
        return this.schoolsService.createSchool(createSchoolDto);
    }

    @Patch('/:id')
    updateSchool(@Param('id') id: string, @Body () updateSchoolDto: UpdateSchoolDto){
        return this.schoolsService.updateSchool(id, updateSchoolDto)
    }

}
