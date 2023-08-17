import {ApiContants} from '../contants';

const getFlagIcon = (
  code = 'VN',
  style = ApiContants.COUNTRY_FLAG.STYLE.FLAT,
  size = ApiContants.COUNTRY_FLAG.SIZE[64],
) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

const getPoster = (imageId:string) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/poster/${imageId}.png`;
  
const getLogo =  (imageId:string) =>`${ApiContants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;
const getGalleryImage = 
  (imageId:string,
  size:string,
) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${imageId}.png`;

// const getFlagIcon = (
//   code = 'VN',
// ) => `${code}.png`;
export default {getFlagIcon,getPoster,getLogo,getGalleryImage};