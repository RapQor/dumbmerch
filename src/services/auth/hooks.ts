import { useCallback, useEffect, useState } from "react";
import { setAuthToken } from "../../lib/api";
import useStore from "../../store/hooks";
import { authApi } from "./api";
import { LoginDTO, RegisterDTO } from "./types";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { setUser: setStoreUser, clearUser } = useStore();

  const login = useCallback(
    async (data: LoginDTO) => {
      try {
        setLoading(true);
        const response = await authApi.login(data);
        const token = response.token;
        setAuthToken(token);
        localStorage.setItem("token", token);
        const userData = await authApi.checkAuth();
        setStoreUser(userData);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setStoreUser]
  );

  const register = useCallback(async (data: RegisterDTO) => {
    try {
      setLoading(true);
      await authApi.register(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authApi.logout();
      clearUser();
      window.location.href = "/auth/login";
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [clearUser]);

  const getCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await authApi.currentUser();
      setStoreUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      return null;
    } finally {
      setLoading(false);
    }
  }, [setStoreUser]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const userData = await authApi.checkAuth();
        setStoreUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setStoreUser]);

  return { loading, error, login, register, logout, getCurrentUser };
};
