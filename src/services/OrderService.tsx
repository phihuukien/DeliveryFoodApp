import axios from "axios";
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";

const addOrder = async (order: any) => {
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
const getOrderDetail = async (orderId: string) => {
  console.log(`OrderService | getOrderDetail`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERDETAIL}` + orderId
    );
    if (response?.data.status) {
      return {
        status: true,
        message: `order data fetched`,
        data: response?.data?.data,
        orderDetail: response?.data.dataOrderDetail,
      };
    } else {
      return {
        status: false,
        message: `order data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `order data not found`,
    };
  }
};

const cancelOrder = async (orderCancel: any) => {
  console.log(`OrderService | cancelOrder`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CANCEL_ORDER}`,
      orderCancel,
      {
        headers: authHeader(getToken()),
      },
    );
    console.log(response?.data)
    if (response?.data.status) {
      return {
        status: response?.data.status,
        message: response?.data?.Message,
      };
    } else {
      return {
        status: response?.data.status,
        message: response?.data?.Message,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: `cancel Order failed exception`,
    };
  }
};

const getOrderToReview = async () => {
  console.log(`OrderService | getOrderReview`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERReview}`,
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
export default { addOrder, getOrderComing, getOrderHistory, getOrderDetail ,cancelOrder,getOrderToReview}; 