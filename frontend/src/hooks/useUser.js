import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../services/authApi"


export const useUser = ()=>{
    return useQuery({
        queryKey:["user"],
        queryFn:getProfile,
        retry: false,
    })
}