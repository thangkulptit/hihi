export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterUserPayload {
  email: string;
  password: string;
}

export interface StatusResponse {
  success: boolean;
  message: string;
}
