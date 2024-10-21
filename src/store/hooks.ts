import { useContext } from "react";
import { Store } from "./index";

const useStore = () => {
  const context = useContext(Store);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};

export default useStore;
