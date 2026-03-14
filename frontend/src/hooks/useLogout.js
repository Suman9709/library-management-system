import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authApi";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries(["user"]);
            navigate("/");
            console.log("Logout successful");

        }
    })
}