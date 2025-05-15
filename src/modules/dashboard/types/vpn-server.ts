export interface CreateVpnServerPayload {
  name: string;
  host: string;
  location: string;
  port: number;
  protocol: 'wireguard' | string; // Nếu chỉ dùng wireguard thì có thể để literal type
  username: string;
  password: string;
  ping_ms: number;
  is_active: boolean;
}

export interface VpnServer extends CreateVpnServerPayload {
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export type UpdateVpnServerPayload = CreateVpnServerPayload;
export type UpdateVpnServerResponse = VpnServer;