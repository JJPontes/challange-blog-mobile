export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  details: {
    token: string;
    id: string;
    email: string;
    name: string;
    roleId: string;
  };
}

export interface StatusResponse {
  status: string;
}
