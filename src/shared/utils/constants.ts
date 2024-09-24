import dotenv from 'dotenv';

try {
  dotenv.config();
} catch (_error) {
  _error;
}

export const DATE_FORMAT = 'MMM D, YYYY h:mm A';

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const PSYCHOLOGIST_URL = process.env.NEXT_PUBLIC_PSYCHOLOGIST_URL;
