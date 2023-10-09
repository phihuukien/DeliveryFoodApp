import axios from "axios";
const config = require('../../package.json').projectConfig;
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const addReview = async (dataReview: any) => {
    try {

        const url = `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ADDREVIEW}`;
        const reviewsResponse = await axios.post(url,
            dataReview,
            {
                headers:
                {
                    ...authHeader(getToken()),
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        if (reviewsResponse.data.status === true) {
            return {
                status: true,
                message: `review data fetched`,
                data: reviewsResponse.data.data,
            };
        } else {
            return {
                status: false,
                message: `review data not found`,
            };
        }
    } catch (error: any) {
        return {
            status: false,
            message: error.response,
        };
    }
}

const getReviews = async (foodReviewId: string) => {
    try {
        const url = `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETREVIEW}` + foodReviewId;
        const response = await axios.get(url, {
            headers: authHeader(getToken()),
        });
        return response.data;
    } catch (error) {
        return { status: false, message: 'Oops! Something went wrong' };
    }
}

const getReviewItem = async (orderId: string) => {
    try {
        const url = `${BACKEND_BASE_URL}${ApiContants.BACKEND_API.GETREVIEWITEM}` + orderId;
        const response = await axios.get(url, {
            headers: authHeader(getToken()),
        });
        return response.data;
    } catch (error) {
        return { status: false, message: 'Oops! Something went wrong' };
    }
}
const getRatingRestaurant = async (restaurantId: string) => {
    try {
        const url = `${BACKEND_BASE_URL}${ApiContants.BACKEND_API.GETRATING}` + restaurantId;
        const response = await axios.get(url, {
            headers: authHeader(getToken()),
        });
        
        return response.data;
    } catch (error) {
        return { status: false, message: 'Oops! Something went wrong' };
    }
}

export default { getReviews, addReview, getReviewItem,getRatingRestaurant };  
