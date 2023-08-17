import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ApiContants, Colors, Fonts} from '../contants';
import {StaticImageService} from '../services';
import {Display} from '../utils';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { CartAction } from '../actions';

const OrderCard = ({id,count,price,restaurant,navigate}:any) => {
  return (
    
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigate(id)}>
        <Image
          style={styles.image}
          source={{uri: StaticImageService.getPoster(restaurant.images.poster)}}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity  activeOpacity={0.8} onPress={()=>navigate(id)}>
          <Text numberOfLines={1} style={styles.titleText}>
          {restaurant.name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
          {restaurant.location}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>$ {price} ( {count} mon)</Text>
         
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default OrderCard;