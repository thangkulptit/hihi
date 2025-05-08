import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http";
import { CreateShopPayload, FetchShopResponse, Shop, UpdateShopPayload, UpdateShopResponse } from "../types/shop";
import { delay } from "@/cores/utils";

interface ShopState {
  shops: Shop[];
  isLoading: boolean;
}

export const useShopStore = defineStore("shop", {
  state: (): ShopState => ({
    shops: [],
    isLoading: false
  }),
  getters: {
    
  },
  actions: {
    async fetchAll(): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<FetchShopResponse>("/shops");
        if (!response.ok) {
          throw new Error("Lấy shop thất bại");
        }

        this.shops = response.data.shops;
        return {
          success: true,
          message: "Lấy thành công danh sách shop!",
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

    async create(payload: CreateShopPayload): Promise<StatusResponse> {
      try {
        const response = await http.post<any>("/shops", { body: payload });
        if (!response.ok) {
          throw new Error("Thêm shop thất bại");
        }

        return {
          success: true,
          message: "Tạo thành công shop",
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async update(id: string, payload: UpdateShopPayload): Promise<StatusResponse> {
      try {
        const response = await http.put<UpdateShopResponse>(`/shops/${id}`, { body: payload });
        if (!response.ok) {
          throw new Error("Update shop thất bại");
        }

        return {
          success: true,
          message: "Update thành công shop",
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
        const response = await http.delete<UpdateShopResponse>(`/shops/${id}`);
        if (!response.ok) {
          throw new Error("Xoá shop thất bại");
        }

        return {
          success: true,
          message: "Xoá shop thành công shop: " + id,
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


