export interface Shop {
  id: string;
  email: string;
  secret: string;
  key: string;
  domain: string;
  callback: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopPayload {
  domain: string;
  callback: string;
  active: boolean;
}

export type UpdateShopPayload = CreateShopPayload 
export type UpdateShopResponse = {
  shop: Shop
} 

export interface FetchShopResponse {
  shops: Shop[];
}