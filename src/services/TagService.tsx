import axios from "axios";
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";

const getAllTags = async () => {
    try {
        const url = `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETALLTAGS}`;
        const response = await axios.get(url, {
            headers: authHeader(getToken()),
        });
        console.log(`tag service`,response.data)
        return response.data;
    } catch (error) {
        return { status: false, message: 'Oops! Something went wrong' };
    }
}

export default { getAllTags };  
