import { Controller, Get } from '@nestjs/common';
import { GetSchoolsDto } from '../models/get-schools-dto';

@Controller('schools')
export class SchoolsController {

    schools: GetSchoolsDto[] = [
        { id: 'S2019876', name: 'Sandon Academy', email: 'sandon@google.com', cell: '0778261057', address: 'Gutu' },
        { id: 'S2013456', name: 'Gutu High', email: 'gutuhigh@google.com', cell: '0778261057', address: 'Gutu' }
    ]

    @Get()
    getSchools(){
        return this.schools;
    }
}
