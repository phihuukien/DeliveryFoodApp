import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ApiContants, Colors, Fonts, Images } from '../contants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import { Separator } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import FoodService from '../services/FoodService';
import { CartAction } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReviewService from '../services/ReviewService';
import moment from 'moment';

const setStyle = (isActive: boolean) =>
  isActive
    ? styles.subMenuButtonText
    : { ...styles.subMenuButtonText, color: Colors.DEFAULT_GREY };

const FoodScreen = ({ route, navigation }: any) => {
  const { foodId } = route.params
  const [food, setFood] = useState<any>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string>('Details');
  const [reviews, setReviews] = useState<any>();


  const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
  const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

  const itemCount = useSelector(
    (state: any) =>
      state?.cartState?.cartDetail?.cartItems?.find((item: any) => item?.foodId === foodId)
        ?.count,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    FoodService.getOneFoodById(foodId).then((response: any) => {
      setFood(response?.data);
    });
  }, []);
  useEffect(() => {
    ReviewService.getReviews(foodId).then((response: any) => {
      setReviews(response?.data)
    })
  }, []);
  const addToCart = () => {
    let cart = {
      foodId: food.id,
      price: food.price,
      restaurantId: food.restaurantId,
    }
    dispatch(CartAction.addToCart({ cart }))
  };

  const removeFromCart = () => {
    let cart = {
      foodId: food.id,
      price: food.price,
    }
    dispatch(CartAction.removeFromCart({ cart }));
  }

  const renderContent = () => {
    const reviewDate = moment().format('DD-MM-YYYY HH:mm');
    if (selectedSubMenu === 'Details') {
      return (
        <View style={styles.detailsContainer}>
          {food?.description ? (
            <>
              <Text style={styles.detailHeader}>Description</Text>
              <Text style={styles.detailContent}>{food?.description}</Text>
            </>
          ) : null}
          {food?.ingredients ? (
            <>
              <Text style={styles.detailHeader}>Ingredients</Text>
              <Text style={styles.detailContent}>{food?.ingredients}</Text>
            </>
          ) : null}
        </View>
      )
    } else if (selectedSubMenu === 'Reviews') {
      return (
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.detailHeader}>Comment</Text>
          {reviews?.map((item: any, index: any) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 15 }}>
              <View style={{ width: '10%' }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50
                  }}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                  key={item?.id}
                />
              </View>
              <View style={{ width: '90%', marginLeft: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {item.username}
                </Text>
                <View style={styles.customRatingBar}>
                  {Array.from({ length: item.rate }).map((_, index) => (
                    <View style={{ marginRight: 3 }} key={index}>
                      <Image
                        style={styles.starImgStyle}
                        source={{ uri: starImgFilled }}
                      />
                    </View>
                  ))}
                  {Array.from({ length: 5 - item.rate }).map((_, index) => (
                    <View key={index + item.rate}>
                      <Image
                        style={styles.starImgStyle}
                        source={{ uri: starImgCorner }}
                      />
                    </View>
                  ))}
                </View>
                <Text style={{ marginTop: 15, marginBottom: 20 }}>
                  {item.context}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap:'wrap' }}>
                  {item.reviewImg.map((img: any, index: any) => (
                    <View style={{ marginRight: 10 }} key={index}>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          marginBottom: 15
                        }}
                        source={{
                          uri: StaticImageService.getReviewImg(
                            img,
                          ),
                        }}
                      />
                    </View>
                  ))}
                </View>
                <Text>
                  {item.date = reviewDate}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )
    } else {
      return null
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Image style={styles.image}
        source={{
          uri: StaticImageService.getGalleryImage(
            food?.image,
            ApiContants.STATIC_IMAGE.SIZE.SQUARE,
          ),
        }} />
      <ScrollView>
        <Separator height={Display.setWidth(100)} />
        <View style={styles.mainContainer}>
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.titleText}>{food?.name}</Text>
            <Text style={styles.priceText}>$ {food?.price}</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <View style={styles.rowAndCenter}>
              <FontAwesome
                name="star"
                size={20}
                color={Colors.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(255)</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={Images.DELIVERY_TIME} />
              <Text style={styles.deliveryText}>20 min</Text>
            </View>
            <View style={styles.rowAndCenter}>
              <Image style={styles.iconImage} source={Images.DELIVERY_CHARGE} />
              <Text style={styles.deliveryText}>Free Delivery</Text>
            </View>
          </View>
          <View style={styles.subMenuContainer}>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Details')}>
              <Text style={setStyle(selectedSubMenu === 'Details')}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuButtonContainer}
              onPress={() => setSelectedSubMenu('Reviews')}>
              <Text style={setStyle(selectedSubMenu === 'Reviews')}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.itemAddContainer}>

          {itemCount > 0 ? (
            <AntDesign
              name="minus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => removeFromCart()}
            />
          ) :
            <AntDesign
              name="minus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
            />
          }
          <Text style={styles.itemCountText}>{itemCount ? itemCount : 0}</Text>
          <AntDesign
            name="plus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => addToCart()}
          />
        </View>
        {itemCount > 0 ? (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('CartScreen', { restaurantId: food.restaurantId })}
            activeOpacity={0.8}>
            <Text style={styles.cartButtonText}>Go to Cart</Text>
          </TouchableOpacity>) : null}
      </View>
      <Ionicons
        style={{ position: 'absolute', color: Colors.DEFAULT_GREY, zIndex: 100, top: 50 }}
        name="chevron-back-outline"
        size={30}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  image: {
    position: 'absolute',
    height: Display.setWidth(100),
    width: Display.setWidth(100),
    top: 0,
  },
  mainContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  priceText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_YELLOW,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  iconImage: {
    height: 20,
    width: 20,
  },
  deliveryText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 3,
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    marginTop: 20,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: 'space-evenly',
  },
  subMenuButtonContainer: {
    paddingVertical: 15,
    width: Display.setWidth(30),
    alignItems: 'center',
  },
  subMenuButtonText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailHeader: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginTop: 10,
    marginBottom: 2,
  },
  detailContent: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.INACTIVE_GREY,
    textAlign: 'justify',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: Display.setWidth(5),
    justifyContent: 'space-between',
    backgroundColor: Colors.DEFAULT_WHITE,
    width: Display.setWidth(100),
    paddingVertical: Display.setWidth(2.5),
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    height: Display.setHeight(6),
    width: Display.setWidth(30),
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: Display.setWidth(58),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  customRatingBar: {
    flexDirection: 'row',
    marginTop: 5
  },
  starImgStyle: {
    width: 15,
    height: 15,
    resizeMode: 'cover'
  },
});

export default FoodScreen;