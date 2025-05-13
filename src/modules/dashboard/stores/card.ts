// src/stores/cardStore.ts
import { defineStore } from 'pinia';
import http from "@/cores/api/http";
import { Card, SearchPayload, SearchResponse } from '../types/card';
import { StatusResponse } from '@/modules/auth/types';
import { toQueryParams } from '@/cores/utils';

interface CardState {
  cards: Card[];
  isLoading: boolean;
  search: SearchPayload
}

export const useCardStore = defineStore('card', {
  state: (): CardState => ({
    cards: [],
    isLoading: false,
    search: {
      page: 1,
      size: 20,
      total: 0,
      seri: ''
    }
  }),

  getters: {
    countPage: (state: CardState) => {
      return Math.ceil(Number(state.search.total) / Number(state.search.size));
    }
  },

  actions: {
    async fetchCards(): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const params = toQueryParams(this.search);
        const response = await http.get<SearchResponse>(`/cards?${params}`);
        if (!response.ok) {
          throw new Error("Lấy cards thất bại");
        }

        this.cards = response.data.cards;
        this.search.total = response.data.total;
        return {
          success: true,
          message: "Lấy thành công danh sách card!",
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
    
    setPage(page: number) {
      this.search.page = page;
      return this.fetchCards();
    },
    
    setPageSize(size: number) {
      this.search.size = size;
      this.search.page = 1; // Reset về trang đầu tiên khi thay đổi kích thước
      return this.fetchCards();
    },
    
    setSearchSerial(serial: string) {
      this.search.seri = serial;
      this.search.page = 1; // Reset về trang đầu tiên khi thay đổi tìm kiếm
      return this.fetchCards();
    },
    
    resetFilters() {
      this.search.seri = '';
      this.search.page = 1;
      return this.fetchCards();
    }
  }
});