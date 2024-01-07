import { Request } from 'express';

export interface signupReqBody {
  email: string;
  password: string;
  role: string;
}

export interface signinReqBody {
  email: string;
  password: string;
}

export type cookieBody = {
  token: string;
};

export interface CustomRequest extends Request {
  userId?: string;
  role?: string;
  departmentId?: string;
}

export type forgetPasswordReqBody = {
  email: string;
};

export type resetPasswordReqBody = {
  token: string;
  password: string;
};

export type updateProfileReqBody = {
  bio: string;
};

export interface createDepartmentReqBody {
  departmentName: string;
  description: string;
  headOfDepartment: string;
}

export interface createCourseReqBody {
  courseName: string;
  coursePrefix?: string;
  departmentName?: string;
  credits: number;
  ratings: number;
}

export interface createTeacherReqBody {
  name: string;
  email?: string;
  mobile: string;
  gender: string;
  specialization: string;
  yearsOfExperience: number;
  street?: string;
  city?: string;
  state?: string;
  zip?: number;
}

export interface createStudentReqBody {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: number;
  nationality?: string;
}
