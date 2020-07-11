export interface User {
  id: string;
  name: string;
  password?: string;
  access_token: string;
  statusCode: number;
}

export type AuthType = 'login' | 'register';
