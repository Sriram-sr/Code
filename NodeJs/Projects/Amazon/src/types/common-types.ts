import { Request } from 'express';

export interface cookieOptionsType {
  expires: Date;
  httpOnly: boolean;
}

export interface customRequest extends Request {
  userId?: string;
}

export interface productFilterQueryParams {
  page?: number;
  price?: {
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
  };
  brand?: string;
  category?: string;
}
