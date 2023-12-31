import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../contants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StaticImageService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkAction } from '../actions';
import ReviewService from '../services/ReviewService';

const RestaurantCard = ({
  id,
  name,
  image,
  tags,
  distance,
  times,
  navigate,
}: any) => {
  
  const dispatch = useDispatch<any>();
  const isBookmarked = useSelector(
    (state: any) =>
      state?.bookmarkState?.bookmarks?.filter((item: any) => item?.restaurantId === id)
        ?.length > 0,
  );
  const [rating, setRating] = useState(0);
  const [ratedOrder, setRatedOrder] = useState(Number);
  ReviewService.getRatingRestaurant(id).then((response: any) => {
    setRating(response.avgRating);
    setRatedOrder(response.totalOrderRated);
  })

  const addBookmark = () =>
    dispatch(BookmarkAction.addBookmark({ restaurantId: id }));
  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({ restaurantId: id }));

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigate.navigate('RestaurantScreen', { restaurantId: id, rate: rating, review: ratedOrder })}>
      <Ionicons
        color={Colors.DEFAULT_YELLOW}
        size={24}
        style={styles.bookmark}
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
      />
      <Image
        source={{ uri: StaticImageService.getPoster(image.poster) }}
        style={styles.posterStyle}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.tagText}>{tags.join(' • ')}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
          <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
          <Text style={styles.ratingText}>{rating.toFixed(1)} </Text>
          {ratedOrder > 2 ?
            <Text style={styles.reviewsText}>(2+)</Text>
            :
            <Text style={styles.reviewsText}>({ratedOrder})</Text>
          }

        </View>
        <View style={styles.rowAndCenter}>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="location-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{distance}</Text>
          </View>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="ios-time-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{times}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_YELLOW,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});

export default RestaurantCard;