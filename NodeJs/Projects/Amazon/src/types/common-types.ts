import { Request } from 'express';

export interface cookieOptionsType {
  expires: Date;
  httpOnly: boolean;
}

export interface customRequest extends Request {
  userId?: string;
}
