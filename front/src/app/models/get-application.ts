import { GetSchool } from './get-school';

export interface GetApplication {
  data: {
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

    selectedSchools: GetSchool;

    aLevelCombination: string[];
  };

  id: string;

  status: string;
}
