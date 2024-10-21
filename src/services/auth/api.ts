import { api } from "../../lib/api";
import {
  LoginDTO,
  RegisterDTO,
  UserEntity,
  AuthResponse,
  CurrentUserResponse,
} from "./types";

export const authApi = {
  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterDTO): Promise<UserEntity> => {
    const response = await api.post<UserEntity>("/auth/register", data);
    return response.data;
  },

  checkAuth: async (): Promise<UserEntity> => {
    const response = await api.get<UserEntity>("/auth/me");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  currentUser: async (): Promise<CurrentUserResponse> => {
    const response = await api.get<CurrentUserResponse>("/auth/currentUser");
    return response.data;
  },

  checkUser: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/checkUser", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};
