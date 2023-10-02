import axios from "axios";
const config = require('../../package.json').projectConfig;
import { ApiContants } from "../contants";
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const getRestaurants = async () => {
    try {
        const url = `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.RESTAURANT}`;
        const restaurantsResponse = await axios.get(url);
        if (restaurantsResponse.status === 200) {

            return {
                status: true,
                message: `Restaurant data fetched`,
                data: restaurantsResponse.data,
            };
        } else {
            return {
                status: false,
                message: `Restaurant data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Restaurant data not found`,
        };
    }

}

const getOneRestaurantById = async (id: string) => {
    try {
        const url = `${BACKEND_BASE_URL}/restaurants/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
}

const getOneRestaurantByTag = async (tagName: string) => {
    try {
        const url = `${BACKEND_BASE_URL}/restaurants/tag/${tagName}`;
        const response = await axios.get(url);
        console.log(`huhu`,response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
}
export default { getRestaurants, getOneRestaurantById, getOneRestaurantByTag };  
