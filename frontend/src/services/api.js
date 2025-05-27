import axios from "axios";

const api = axios.create(
    {
        baseURL: "http://localhost/POO/Api/"
    }
)

export default api;