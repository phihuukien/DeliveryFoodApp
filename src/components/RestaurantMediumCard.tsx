import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Images } from '../contants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReviewService from '../services/ReviewService';
import { BookmarkAction } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const RestaurantMediumCard = ({ name, images: { logo }, times, distance, tags, id, navigate }: any) => {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch<any>();
  const [ratedOrder, setRatedOrder] = useState(Number);
  const isBookmarked = useSelector(
    (state: any) =>
      state?.bookmarkState?.bookmarks?.filter((item: any) => item?.restaurantId === id)
        ?.length > 0,
  );
  ReviewService.getRatingRestaurant(id).then((response: any) => {
    setRating(response.avgRating);
    setRatedOrder(response.totalOrderRated);
  })
  
  const addBookmark = () =>
    dispatch(BookmarkAction.addBookmark({ restaurantId: id }));
  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({ restaurantId: id }));
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigate.navigate('RestaurantScreen', { restaurantId: id, rate: rating, review: ratedOrder })}>
          <Image
            source={{ uri: StaticImageService.getLogo(logo) }}
            style={styles.posterStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={styles.rowAndCenter}>
          <Ionicons
        color={Colors.DEFAULT_YELLOW}
        size={24}
        style={styles.bookmark}
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
      />
          </View>
        </View>
        <Text style={styles.tagsText}>{tags?.join(' • ')}</Text>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.deliveryDetailsText}>
            <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
            <Text style={styles.ratingText}>{rating.toFixed(1)} </Text>
            {ratedOrder > 2 ?
              <Text style={styles.reviewsText}>(2+)</Text>
              :
              <Text style={styles.reviewsText}>({ratedOrder})</Text>
            }
          </Text>
          <View style={styles.rowAndCenter}>
            <Image
              source={Images.DELIVERY_CHARGE}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
          </View>

          <View style={styles.rowAndCenter}>

            <Text style={styles.deliveryDetailsText}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 8,
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: Display.setWidth(20),
    height: Display.setWidth(20),
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
});

export default RestaurantMediumCard;