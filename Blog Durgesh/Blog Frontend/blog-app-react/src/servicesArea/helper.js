import axios from "axios";
import { getToken } from "../auth/authIndex";
export const BASE_URL = 'http://localhost:5000/api/v1';

export const myAxios = axios.create({
    baseURL: BASE_URL
})

export const privateAxios = axios.create({
    baseURL: BASE_URL
})

privateAxios.interceptors.request.use(config => {

    const token = getToken()
    if (token) {
        // if (!config.headers)
        //     config.headers = {}
        // if (!config.headers.common)
        //     config.headers.common = {}
        // console.log(token)  // token aa gaya hai
        // console.log("inside the privateAxios.i.r.use & inside if(token): " + token)
        // console.log("inside the privateAxios.i.r.use & inside if(Bearer token): " + `Bearer ${token}`)
        // console.log("config inside if(token) before setting Authorization: "+config)
        config.headers.Authorization = `Bearer ${token}`
        // console.log("config inside if(token): "+config)
    }
    console.log("config: "+config)
    console.log(config)
    return config
}, error => Promise.reject("error => Promise.reject & inside the privateAxios.i.r.use : "+error))
