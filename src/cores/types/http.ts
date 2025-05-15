export interface StatusResponse<T = any> {
  success: boolean;
  message: string;
  data?: T
}