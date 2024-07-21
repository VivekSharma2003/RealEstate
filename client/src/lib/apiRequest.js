import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://realestate-o10e.onrender.com/api",
    withCredentials: true,
});

export default apiRequest;