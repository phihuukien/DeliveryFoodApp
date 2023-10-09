import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Images } from '../contants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import Feather from 'react-native-vector-icons/Feather';

const DeliveryAddress = ({setModalVisible,deliveryAddress,phone}:any) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/googleMap.jpg')}
          style={styles.posterStyle}
        />
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Deliver To : Home</Text>
          <View style={styles.rowAndCenter}>
          <TouchableOpacity activeOpacity={0.8} 
             onPress={() => setModalVisible(true)}
              >
            <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          
          </View>
        </View>
        <View style={styles.textMap}>
          <Feather
            name="map-pin"
            size={10}
          />
          <Text style={styles.tagsText}>{deliveryAddress}</Text>
        </View>
        <View style={styles.textMap}>
          <Feather
            name="phone"
            size={10}
          />
          <Text style={styles.tagsText}>{phone}</Text>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
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
    marginLeft: 7,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 5,
    fontSize: 15,
    
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_YELLOW,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
  textMap:{
    flexDirection: 'row',
    alignItems: 'center',
  }

});

export default DeliveryAddress;