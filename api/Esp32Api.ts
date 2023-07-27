import axios from "axios";

const esp32Api = axios.create({
    baseURL: '/api'
});

export default esp32Api;