export interface IStoreStates {
  user: IUser;
  isLogin: boolean;
  isAdmin: boolean;
}

export interface IStoreActions {
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

export type TStore = IStoreStates & IStoreActions;
