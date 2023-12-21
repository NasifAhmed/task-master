import axios from "axios";

export const useAxios = () => {
    const instance = axios.create({
        baseURL: "http://localhost:5000",
        timeout: 1000,
    });
    return instance;
};
