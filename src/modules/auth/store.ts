import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http.type";
import { decodeJWT } from "@/cores/utils/helper";


interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.accessToken) return false;

      try {
        const decoded = decodeJWT(state.accessToken);
        if (!decoded.exp) return false;

        return Date.now() <= decoded.exp * 1000;
      } catch (error) {
        return false;
      }
    },
    user: (state) => {
      return decodeJWT(state.accessToken);
    }
  },
  actions: {
    async login(payload: LoginPayload): Promise<StatusResponse> {
      try {
        const response = await http.post<LoginResponse>('/auth/signin', {
          body: payload
        })

        if (response.ok) {
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)
          return {
            success: true, message: 'Đăng nhập thành công!'
          }
        }

        throw new Error('Đăng nhập thất bại');
      } catch (error: any) {
        return {
          success: false, message: error.message
        }
      }
    },
    async logout(): Promise<StatusResponse> {
      const response = await http.post('/auth/logout');
      if (response.ok) {
        this.accessToken = '';
        this.refreshToken = '';
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        
        return {
          success: true, message: 'Đăng xuất thành công'
        }
      }

      return {
        success: false, message: 'Đăng xuất thất bại'
      }
    },
    async createUser(payload: RegisterUserPayload): Promise<StatusResponse> {
      try {
        const response = await http.post<LoginResponse>('/auth/signup', {
          body: payload
        })

        if (response.ok) {
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)

          return {
            success: true, message: 'Đăng ký user thành công!'
          }
        }

        throw new Error('Có vấn đề gì đó');
      } catch (error: any) {
        return {
          success: false, message: error.message
        }
      }
    }
  },
})

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