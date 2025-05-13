import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http";
import { StatisticCard, StatisticCardResponse } from "../types/card";

interface StatisticState {
  today: StatisticCard[];
  month: StatisticCard[];
  isLoading: boolean;
}

export const useStatisticStore = defineStore("statistic", {
  state: (): StatisticState => ({
    today: [],
    month: [],
    isLoading: false
  }),
  getters: {
    totalAmountToday: (state: StatisticState) => {
      return state.today.reduce((prev, current) => {
        const amount = prev.amount + current.amount;
        const realAmount = prev.realAmount + current.realAmount;
        return { amount, realAmount }
      }, { amount: 0, realAmount: 0 })
    },
    totalAmountMonth: (state: StatisticState) => {
      return state.month.reduce((prev, current) => {
        const amount = prev.amount + current.amount;
        const realAmount = prev.realAmount + current.realAmount;
        return { amount, realAmount }
      }, { amount: 0, realAmount: 0 })
    }
  },
  actions: {
    async fetchAll(): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<StatisticCardResponse>("/cards/statistic");
        if (!response.ok) {
          throw new Error("Lấy thống kê thất bại");
        }

        this.today = response.data.today;
        this.month = response.data.month;
        return {
          success: true,
          message: "Lấy thành công thống kê!",
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

  },
});


