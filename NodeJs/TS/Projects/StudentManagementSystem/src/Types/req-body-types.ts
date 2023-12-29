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

export interface cookieBody{
  token: string;
}

export interface CustomRequest extends Request {
    userId?: string;
  }
