import { Status } from "@/cores/contants/enum";

export interface SearchPayload {
  page: string | number;
  size: string | number;
  total: string | number;
  seri: string;
}

export interface SearchResponse {
  cards: Card[];
  total: string | number;
}


export interface Card {
  type: string; // e.g., "VIETTEL"
  amount: number;
  realAmount: number;
  seri: string;
  pin: string;
  message: string;
  status: number;
  statusCallback: Status;
  useCronjob: boolean;
  orderById: string;
  shopId: string;
  id: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  shopRelation: ShopRelation;
}

interface ShopRelation {
  email: string;
  secret: string;
  key: string;
  domain: string;
  callback: string;
  active: boolean;
  id: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface StatisticCard {
  domain: string;
  amount: number;
  realAmount: number;
}

export interface StatisticCardResponse {
  today: StatisticCard[];
  month: StatisticCard[];
}