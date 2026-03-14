import axios from "axios";


const API_URL = "http://localhost:3000/api";



export const totalBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books/totalbooks`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching total books:", error);

    }
}


export const issuedBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/issues/getuserissuedbooks`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching issued books:", error);

    }
}

export const fetchAllBooks = async()=>{
    try {
        const response = await axios.get(`${API_URL}/books/getbooks`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error);
    }
}