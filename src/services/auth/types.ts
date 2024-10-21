export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  profile_pic?: string;
  phone?: number;
  gender?: string;
  address?: string;
}

export interface UserEntity {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
}

export interface CurrentUserResponse {
  id: number;
  name: string;
  email: string;
  phone: number;
  gender: string;
  address: string;
  profile_pic: string;
}
