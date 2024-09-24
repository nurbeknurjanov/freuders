import * as jose from 'jose';
import { IUser } from 'api/usersApi';

interface IJWTPayload {
  user: IUser;
  expire: string;
  type: 'refreshToken' | 'accessToken';
}

export class JWT {
  static async parseToken(token: string): Promise<IJWTPayload> {
    /*const parsed = await jose.jwtVerify<IJWTPayload>(
      token,
      new TextEncoder().encode(secret_key)
    );
    parsed.payload;
    */
    const payload = await jose.decodeJwt<IJWTPayload>(token);

    if (new Date(payload.expire).getTime() < new Date().getTime()) {
      throw new Error('Token is expired');
    }

    return payload;
  }
}
