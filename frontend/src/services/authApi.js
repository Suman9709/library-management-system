import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async ({ email, password }) => {
    const response = await axios.post(
        `${API_URL}/auth/userlogin`,
        { email, password },
        { withCredentials: true }
    );

    return response.data;
};

export const logout = async () => {
    const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
    );

    return response.data;
};

export const getProfile = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/me`,
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {

    }
}


export const totalUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/allusers`, { withCredentials: true });
        return response.data;

    } catch (error) {
        console.error("Error fetching total users:", error);
    }
}