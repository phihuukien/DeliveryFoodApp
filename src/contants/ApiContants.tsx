const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;
const BACKEND_BASE_URL_IMG = config.backendApiBaseUrlImg;

const COUNTRY_FLAG = {
    BASE_URL: `https://flagsapi.com/`,
    SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
    STYLE: {FLAT: 'flat', SHINY: 'shiny'},
  };
const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}`,
  REGISTER: '/User/register',
  LOGIN: '/User/login',
  RESTAURANT: '/restaurants',
  CARTS: '/carts',
  CARTSDETAIL: '/carts/cartdetail',
  FOOD: '/food',
  BOOKMARK: '/bookmarks',
  REFRESH_TOKEN: '/refreshToken',
  ADDORDER: '/orders/add',
  GETORDERCOMING: '/orders/getordercoming',
  GETORDERHISTORY: '/orders/getorderhistory',
  GETORDERDETAIL: '/orders/get-order-detail/',

  ADDREVIEW:'/reviews/add',
  GETREVIEW:'/reviews/get/',
  GETREVIEWITEM:'/reviews/item/',
  GETRATING:'/reviews/rating/',
  GETALLTAGS:'/tags/getAll',
  GETRESTAURANTBYTAG:'/restaurants/tag/'
}  
const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL_IMG}`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
};
  
export default {COUNTRY_FLAG,BACKEND_API,STATIC_IMAGE};