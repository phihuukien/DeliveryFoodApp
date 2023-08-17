import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getBookmarks = async () => {
  console.log(`BookmarkService | getBookmarks`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.BOOKMARK}`,
      {
        headers: authHeader(getToken()),
      },
    );
    console.log(response?.data)
    if (response?.data.status) {
      return {
        status: true,
        message: `Bookmark data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bookmark data not found`,
      };
    }
  } catch (error:any) {
    return {
      status: false,
      message: `Bookmark data not found`,
      statusCode: error.response.status,
    };
  }
};

const addBookmark = async ({restaurantId}:any) => {
  console.log(`BookmarkService | addBookmark`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.BOOKMARK}/addBookMart/${restaurantId}`,
      {},
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.data.status) {
      return {
        status: true,
        message: `Bookmark added successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bookmark adding failed`,
      };
    }
  }
    catch (error:any) {
      return {
        status: false,
        message: `Bookmark adding failed`,
        statusCode: error.response.status,
      };
  }
};

const removeBookmark = async ({restaurantId}:any) => {

  console.log(`BookmarkService | removeBookmark`);
  try {
    let response = await axios.delete(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.BOOKMARK}/removeBookMart/${restaurantId}`,
      {
        headers: authHeader(getToken()),
      },
    );
  
    if (response?.data.status) {
      return {
        status: true,
        message: `Bookmark removed successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bookmark removing failed`,
      };
    }
  } catch (error:any) {
      return {
        status: false,
        message: `Bookmark removing failed`,
        statusCode: error.response.status,
      };
  }
};

export default {getBookmarks, addBookmark, removeBookmark};