import { config } from 'dotenv';

config();

export const MONGODB_URI = process.env.MONGODB_URI as string;
export const PORT = process.env.PORT;
export const JWT_SECURE_KEY = process.env.JWTSECUREKEY;
export const InternalServerErrorCode = process.env.SERVERERRORCODE;