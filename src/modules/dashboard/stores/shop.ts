import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http";
import { Console } from "@/cores/utils/logger";
import { CreateShopPayload, FetchShopResponse, Shop } from "../types/shop";

interface ShopState {
  shops: Shop[];
}

export const useShopStore = defineStore("shop", {
  state: (): ShopState => ({
    shops: []
  }),
  getters: {
    
  },
  actions: {
    async fetchAll(): Promise<StatusResponse> {
      try {
        const response = await http.get<FetchShopResponse>("/shops");
        if (response.ok) {
          this.shops = response.data.data;
          return {
            success: true,
            message: "Lấy thành công danh sách shop!",
          };
        }

        throw new Error("Lấy shop thất bại");
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async create(payload: CreateShopPayload): Promise<StatusResponse> {
      try {
        const response = await http.post<any>("/shops", { body: payload });
        if (response.ok) {
          this.shops = response.data;
          return {
            success: true,
            message: "Tạo thành công shop",
          };
        }

        throw new Error("Thêm shop thất bại");
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
});


