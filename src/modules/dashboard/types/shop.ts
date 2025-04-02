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
  active: string;
}

export interface FetchShopResponse {
  data: Shop[];
}