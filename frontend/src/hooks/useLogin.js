import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authApi";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      console.log("Login Successful", data);

      // store API response exactly
      queryClient.setQueryData(["user"], data);

      const user = data?.data;

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};