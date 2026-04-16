import {
  TPaymentMethod,
  TRegistrationStatus,
  TStatus,
  TYearLevel,
} from './enum';

export type TAcademicFaculty = {
  id: string;
  title: string;
  examePrice: {
    amount: number;
  } | null;
  createdAt: string;
};
export type TBulkAcademicFaculty = {
  examePrice: {
    amount: number;
  } | null;
  academicDepartments: {
    title: string;
    courses: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      academicDepartmentId: string;
      durationInYears: number;
      credit: number;
      courseDisciplineFacultyId: string | null;
    }[];
  }[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  priceId: string | null;
};
export type TDepartemantProps = {
  data: TDepartemant[];
};
export type TSigleFaculty = {
  data: TAcademicFaculty;
};
export type TDepartemant = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  academicFacultyId: string;
  description: string;
  departmentHeadId: string | null;
  academicFaculty: {
    title: string;
  };
  _count: {
    faculties: number;
    courses: number;
    students: number;
  };
  courses: {
    id: string;
    title: string;
  }[];
  departmentHead: {
    name: string;
    id: string;
    avatar: string | null;
  } | null;
};

export type TAdmitionExameFase = {
  name: string;
  id: number;
  buildingId: number | undefined;
  startDate: Date;
  endDate: Date;
  ordem: number;
  duoDate: Date | undefined;
  roomId: number | undefined;
  building: {
    title: string;
  };
  room: {
    roomNumber: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
export type TExamePayment = {
  id: string;
  canditateId: string;
  totalAmount: number;
  extraAmount: number;
  currency: string;
  status: TStatus;
  method: TPaymentMethod;
  transactionRef: string | null;
  payerName: string | null;
  payerIban: string | null;
  payerBank: string | null;
  universityBankAccountId: null;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  ReceiptUrl: string | null;
  universityBankAccount: any;
  paymentItems: [
    {
      id: string;
      amount: number;
      description: string;
      entityType: string;
    },
  ];
};
export type TAdmitionExame = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  exameId: string;
  status: TRegistrationStatus;
  paymentRecipt: string;
  exameDate: Date;
  document: string;
  building: string | null;
  room: string | null;
  phoneNumber: string;
  academicFalcultyId: string;
  email: string;
  paymentAmoute: number;
  exameResults: number;
  passed: boolean;
  fase: {
    name: string;
  };
  ExamePayment: TExamePayment[];
};
export type TDiscipline = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  suspendGrade: number;
  faculty: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: null;
    section: string;
  } | null;
  courses: [
    {
      id: string;
      courseTitle: string;
      department: string;
      courseId: string;
      yearLevel: TYearLevel;
      semesterNumber: number;
      semesterId: string;
      year: string;
    },
  ];
};

export type TCourse = {
  id: string;
  title: string;
  durationInYears: number;
  academicDepartment: {
    id: string;
    title: string;
  };
  priceId: string;
  offeredCourses: {
    offeredCourseSections: {
      title: string;
      maxCapacity: number;
      price: {
        amount: number;
      } | null;
    }[];
  }[];
  faculties: {
    faculty: {
      id: string;
      firstName: string;
      lastName: string;
      profileImage: string | null;
    };
  }[];
  courseDisciplines: {
    discipline: {
      id: string;
      name: string;
    };
    id: string;
    courseId: string;
    yearLevel: TYearLevel;
    disciplineId: string;
    semesterId: string;
  }[];
  CourseShift: {
    shift: {
      id: number;
      name: string;
    };
  }[];

  academicDepartmentId: string;
  price: {
    amount: number;
    currency: string;
  } | null;
};
export type TBankAccounte = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swift: number | null;
  entityCode: number | null;
};
