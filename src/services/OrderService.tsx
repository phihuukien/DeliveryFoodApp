import axios from "axios";
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";

const addOrder = async (order:any) => {
    console.log(`OrderService | addOrder`);
    try {
      let response = await axios.post(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.ADDORDER}`,
        order,
        {
          headers: authHeader(getToken()),
        },
      );
      console.log(response?.data)
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: response?.data?.Message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `Order failed exception`,
      };
    }
  };

  const getOrderComing = async () => {
    console.log(`OrderService | getOrderComing`);
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERCOMING}`,
        {
          headers: authHeader(getToken()),
        },
      );
      console.log("---------------")
      console.log(response?.data)
      console.log("---------------")
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: response?.data?.Message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `GET Order COMMING failed exception`,
      };
    }
  };
  const getOrderHistory = async () => {
    console.log(`OrderService | getOrderhistory`);
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERHISTORY}`,
        {
          headers: authHeader(getToken()),
        },
      );
      console.log(response?.data)
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: response?.data?.Message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `GET Order HISTORY failed exception`,
      };
    }
  };
export default {addOrder,getOrderComing,getOrderHistory}; 