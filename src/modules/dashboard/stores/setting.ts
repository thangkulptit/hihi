import { defineStore } from "pinia";
import http from "@/cores/api/http";
import { StatusResponse } from "@/cores/types/http";

interface State {
  logs: string[];
  fileContent: string;
  isLoading: boolean;
}

export const useSettingStore = defineStore("settings", {
  state: (): State => ({
    logs: [],
    isLoading: false,
    fileContent: ''
  }),
  getters: {
  
  },
  actions: {
    async fetchLogs(): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<{ logs: string[] }>("/settings/logs");
        if (!response.ok) {
          throw new Error("Lấy logs thất bại");
        }

        this.logs = response.data.logs;
        return {
          success: true,
          message: "Lấy thành công thống logs!",
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

    async downloadFile(filename: string): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<any>(`/settings/download/${filename.replace('logs/', '')}`, {
          responseType: 'blob'
        });
        if (!response.ok) {
          throw new Error("Download file thất bại");
        }

        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = filename
        link.click()

        return {
          success: true,
          message: "Download file thành công!",
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

    async viewFile(filename: string): Promise<StatusResponse> {
      try {
        this.isLoading = true;
        const response = await http.get<any>(`/settings/filename/view/${filename.replace('logs/', '')}`);
        if (!response.ok) {
          throw new Error("Download file thất bại");
        }

        this.fileContent = response.data.data

        return {
          success: true,
          message: "Download file thành công!",
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


