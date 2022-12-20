import axios from "axios";

const api = axios.create({
    baseURL: "http://172.18.9.171:5000",
    // baseURL: "http://172.18.9.103:5000",

    // validateStatus: (status) => {
    //     if (status === 401 || status === 403) {
    //       localStorage.clear();
    
    //       window.location.href = "/";
    //       alert("Sessão Expirada.");
    
    //       return status;
    //     } else return status;
    // },
});
    
export default api;

export const createAuth = async (email, password) => {
    return api.post("/auth/login", { email, password });
};

export const listUsers = async () => {
    return api.get("/user/list");
};