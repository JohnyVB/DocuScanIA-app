import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  token: string;
};

type Actions = {
  setToken: (token: string) => void;
};

type PersistedState = State & Actions;

const userStore = create<PersistedState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default userStore;
