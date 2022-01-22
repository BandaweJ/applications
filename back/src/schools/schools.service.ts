import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolsEntity } from './entities/schools.entity';
import { SchoolsRepository } from './repositories/schools.repository';
import { CreateSchoolDto } from '../models/create-school-dto';
import { UpdateSchoolDto } from '../models/update-school-dto';
import { ReadSchoolDto } from 'src/models/read-school-dto';

@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(SchoolsRepository)
        private readonly schoolsRepository: SchoolsRepository,
    ){}

    async getAllSchools(): Promise<SchoolsEntity[]>{
        return await this.schoolsRepository.find();
    }

    async getSchoolById(id: string): Promise<SchoolsEntity>{
        const found = await this.schoolsRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`School with id ${id} not found`);
        }

        return found;
    }

    
    async createSchool(createSchoolDto: CreateSchoolDto): Promise<ReadSchoolDto>{
        const { name, cell, email, address } = createSchoolDto;

        const school = new SchoolsEntity();

        school.address = address;
        school.name = name;
        school.cell = cell;
        school.email = email;

        return await this.schoolsRepository.save(school);
    }

    async updateSchool(id: string, updateSchoolDto: UpdateSchoolDto): Promise<ReadSchoolDto>{
        let school = await this.getSchoolById(id);

        school = {
            ...school,
            ...updateSchoolDto
        }

        return await this.schoolsRepository.save(school);
        //return school;
    }

    async deleteSchool(id: string): Promise<any>{
        const school = await this.getSchoolById(id);

        await this.schoolsRepository.delete(school);
    }
}
