import { ReadSchoolDto } from './read-school-dto';
export class ReadApplicationDto {
  academicDetails: {
    level: string;
    prevschool: string;
    subjects: {
      name: string;
      grade: string;
    }[];
  };

  contactDetails: {
    address: string;
    cell: string;
    email: string;
  };

  parentDetails: {
    name: string;
    title: string;
  };

  personalDetails: {
    dob: string;
    firstname: string;
    idnumber: string;
    lastname: string;
    sex: string;
    studentnumber: string;
  };

  selectedSchools: ReadSchoolDto;

  aLevelCombination: string[];
}
