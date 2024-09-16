import Axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const config = {
    useInterceptors: true,
};

export const csrf = async () => axios.get(baseURL + "/sanctum/csrf-cookie");

console.log('csrf::baseURL: ', csrf);

export const axios = Axios.create({
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
    },
    baseURL: baseURL,
    withCredentials: true,
});

config.useInterceptors &&
    axios.interceptors.request.use((config) => {
        let sanctumToken = localStorage.getItem("token");

        if (!!sanctumToken)
            config.headers["Authorization"] = `Bearer ${sanctumToken}`;

        return config;
    });

config.useInterceptors &&
    axios.interceptors.response.use(
        (response) => {
            // if (response.status === 200 || response.status === 201) {
            //     // console.log('response.data.message')
            // }
            return response;
        },
        (error) => {
            if (error.response && error.response.data.message) {
                const errors = error.response.data.errors;
                if (errors) {
                    for (var key of Object.keys(errors)) {
                        toast.error(key + ":" + errors[key]);
                    }
                }
            }
            const expectedError =
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500;
            if (!expectedError) {
                console.error("Axios::unexpected error:", error);
            }
            if (error.response && error.response.status === 401) {
                console.error("Axios::unauthhorized error:", error);
            }
            if (error.response && error.response.status === 403) {
                console.error("Axios::unauthhorized error:", error);
            }
            if (error.response && error.response.status === 404) {
                console.error("Axios::not found error:", error);
            }
            if (error.response && error.response.status === 500) {
                console.error("Axios::server error:", error);
            }
            return Promise.reject(error);
        }
    );

export const post = axios.post;
export const get = axios.get;
export const put = axios.put;
export const del = axios.delete;

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;
