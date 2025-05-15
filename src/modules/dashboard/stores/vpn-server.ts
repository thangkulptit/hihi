import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http";
import { CreateVpnServerPayload, UpdateVpnServerPayload, UpdateVpnServerResponse, VpnServer } from "../types/vpn-server";

interface State {
  servers: VpnServer[];
  isLoading: boolean;
}

export const useVpnServerStore = defineStore("vpn-server", {
  state: (): State => ({
    servers: [],
    isLoading: false
  }),
  getters: {
    
  },
  actions: {
    async fetchAll(): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<VpnServer[]>("/servers");
        if (!response.ok) {
          throw new Error("Lấy servers thất bại");
        }

        this.servers = response.data;
        return {
          success: true,
          message: "Lấy thành công danh sách servers!",
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      } finally {
        this.isLoading = false;
      }
    },

    async getById(id: string): Promise<StatusResponse<VpnServer>> {
      try {
        this.isLoading = true;
        const response = await http.get<VpnServer>(`/servers/${id}`);
        if (!response.ok) {
          throw new Error("Lấy server = id thất bại");
        }

        return {
          success: true,
          message: "Lấy thành công danh sách servers!",
          data: response.data
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
          data: undefined
        };
      } finally {
        this.isLoading = false;
      }
    },

    async create(payload: CreateVpnServerPayload): Promise<StatusResponse> {
      try {
        const response = await http.post<any>("/servers", { body: payload });
        if (!response.ok) {
          throw new Error("Thêm servers thất bại");
        }

        return {
          success: true,
          message: "Tạo thành công servers",
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async update(id: string, payload: UpdateVpnServerPayload): Promise<StatusResponse> {
      try {
        const response = await http.put<UpdateVpnServerResponse>(`/servers/${id}`, { body: payload });
        if (!response.ok) {
          throw new Error("Update server thất bại");
        }

        return {
          success: true,
          message: "Update thành công server",
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async remove(id: string): Promise<StatusResponse> {
      try {
        const response = await http.delete<unknown>(`/servers/${id}`);
        if (!response.ok) {
          throw new Error("Xoá server thất bại");
        }

        return {
          success: true,
          message: "Xoá server thành công id: " + id,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
});


