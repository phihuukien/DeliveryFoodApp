import {ApiContants} from '../contants';
import axios, { AxiosError } from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getUserData = async () => {
  console.log(`UserService | getUserData`);
  try {
    console.log(authHeader(getToken()));
    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}/user/get-user`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (userResponse?.data.status) {
      return {
        status: true,
        message: "User data fetched",
        data: userResponse?.data.data,
      };
    } else {
      return {
        status: false,
        message: "User data not found",
      };
    }
  } catch (error:any) {
    // error?.response?.data?.message
    //     ? error?.response?.data?.message
    //     : `User data not found`
   
    return {
      status:false,
      statusCode: error.response.status,
      message: "exception",
    
    };
  }
};

export default {getUserData};