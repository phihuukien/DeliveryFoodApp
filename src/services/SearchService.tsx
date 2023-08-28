import axios from "axios";
const config = require('../../package.json').projectConfig;
import { ApiContants } from "../contants";
const BACKEND_BASE_URL = config.backendApiBaseUrl;


const GetRestaurantsByNameFood = async (foodName: any) => {

    try {
        console.log(foodName)
        const url = `${ApiContants.BACKEND_API.BASE_API_URL}/food/nameFood/${foodName}`;
        const response = await axios.get(url);
        console.log(response.data)
        if (response.data.status) {
            return {
                status: true,
                message: `food data fetched`,
                data: response.data.data,
            };
        } else {
            return {
                status: false,
                message: `food data not found`,
            };
        }
    } catch (error: any) {
        return {
            status: false,
            message: `food data not found`,
            statusCode: error.response.status,
        };
    }
}
export default { GetRestaurantsByNameFood };  