import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser, TStore } from "../types/store";

interface StoreProps {
  children: React.ReactNode;
}

export const Store = createContext<TStore | null>(null);

export const StoreProvider: React.FC<StoreProps> = ({ children }) => {
  const [user, setUserState] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    token: "",
    role: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const setUser = useCallback((newUser: IUser) => {
    setUserState((prevUser) => {
      if (JSON.stringify(prevUser) !== JSON.stringify(newUser)) {
        setIsLogin(true);
        return newUser;
      }
      return prevUser;
    });
  }, []);

  const clearUser = useCallback(() => {
    setUserState({
      id: 0,
      name: "",
      email: "",
      token: "",
      role: "",
    });
    setIsLogin(false);
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    console.log(user, isLogin);
  }, [user, isLogin]);

  useEffect(() => {
    if (user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user.role]);

  console.log("user=", user, "isAdmin=", isAdmin, "isLogin=", isLogin);

  const storeValue = useMemo(
    () => ({
      user,
      isLogin,
      isAdmin,
      setUser,
      clearUser,
    }),
    [user, isLogin, isAdmin, setUser, clearUser]
  );

  return <Store.Provider value={storeValue}>{children}</Store.Provider>;
};
