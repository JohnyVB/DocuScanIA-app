import axiosInstance from "../services/axios";
import Constants from "expo-constants";

export const onLoginFeature = async (email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post(Constants.expoConfig?.extra?.apiLoginUrl, { email, password });
    return data;
  } catch (error) {
    console.error("Login Error:", error);
  }
};
