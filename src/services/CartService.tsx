import { ApiContants } from '../contants';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';


const getCartItems = async () => {
  console.log(`CartService | getCartItems`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CARTS}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.data.status) {
      return {
        status: true,
        message: `Cart data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cart data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Cart data not found`,
    };
  }
};

const getCartItemsDetail = async () => {
  console.log(`CartService | getCartItemsDetail`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CARTSDETAIL}`,
      {
        headers: authHeader(getToken()),
      },
    );
    // console.log(response?.status);
    // console.log(response?.data);
    if (response?.data.status) {
      console.log(response?.data.data);
      return {
        status: true,
        message: `Cart data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cart data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Cart data not found`,
    };
  }
};

const addToCart = async (cart:any) => {
  console.log(`CartService | addToCart`);

  try {
    let requestCart = {
      foodId: cart.foodId,
      price: cart.price,
      restaurantId: cart.restaurantId,
    };
    console.log(requestCart);
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CARTS}/add`,
      requestCart,
      {
        headers: authHeader(getToken()),
      },
    );
    // console.log(response?.status)
    // console.log(response?.data?.data)
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to cart failed`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};

const removeFromCart = async (cart: any) => {
  console.log(`CartService | removeFromCart`);
  try {
    let requestCart = {
      foodId: cart.foodId,
      price: cart.price,
    };
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CARTS}/remove`,
      requestCart,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item removed from cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item removed from failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};

export default { getCartItems, addToCart, removeFromCart, getCartItemsDetail };