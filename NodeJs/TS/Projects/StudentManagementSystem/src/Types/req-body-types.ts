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

export interface addDepartmentReqBody {
  departmentName: string;
  description: string;
  headOfDepartment: string;
}

export interface addCourseReqBody {
  courseName: string;
  coursePrefix?: string;
  departmentName?: string;
  credits: number;
  ratings: number;
}
