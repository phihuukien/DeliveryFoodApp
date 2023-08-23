import axios from "axios";
const config = require('../../package.json').projectConfig;
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});
const register = async (user: any) => {
    if (!user?.username || !user?.email || !user?.password) {
        return { value: { status: false, message: 'Please fill up all fields' } };
    }

    try {
        let requestBody = {
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
        };
        let registerResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.REGISTER,
            requestBody,
        );
        return registerResponse?.data;

    } catch (error) {
        console.log(error);
        return { value: { status: false, message: 'Oops! Something went wrong' } };
    }
};
const login = async (user: any) => {
    if (!user?.username || !user?.password) {
        return { value: { status: false, message: 'Please fill up all fields' } };
    }
    try {
        let requestBody = {
            username: user.username,
            password: user.password,
        };
        let registerResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.LOGIN,
            requestBody,
        );
        return registerResponse?.data;

    } catch (error:any) {
        console.log(error.data);
        return { value: { status: false, message: 'Oops! Something went wrong' } };
    }
};
const checkUserExist = async (type: string, value: string) => {


    try {
        const url = `${BACKEND_BASE_URL}/user/exist/${type}=${value}`;
        const userCheckResponse = await axios.get(url);
        console.log(userCheckResponse.data);
        return userCheckResponse.data;
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
};

const refreshToken = async () => {
    console.log(`refreshToken | refreshToken`);
    try {
       
        let tokenResponse = await axios.get(
            `${ApiContants.BACKEND_API.BASE_API_URL}/user${ApiContants.BACKEND_API.REFRESH_TOKEN}`,
            {
              headers: authHeader(getToken()),
            },
          );
        if (tokenResponse?.data.status) {
            return {
                status: true,
                data: tokenResponse?.data
            };
        } else {
            return { status: false };
        }
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
};
export default { register, login, checkUserExist, refreshToken };  