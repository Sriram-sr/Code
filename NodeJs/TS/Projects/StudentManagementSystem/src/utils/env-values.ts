import { config } from 'dotenv';

config();

export const MONGODB_URI = process.env.MONGODB_URI as string;
export const PORT = process.env.PORT;
export const JWT_SECURE_KEY = process.env.JWTSECUREKEY as string;
export const JWT_EXPIRES_IN = process.env.JWTEXPIRESIN;
export const COOKIE_EXPIRY_DAYS = process.env.COOKIEEXPIRESIN as any;
export const InternalServerErrorCode = process.env.SERVERERRORCODE;
