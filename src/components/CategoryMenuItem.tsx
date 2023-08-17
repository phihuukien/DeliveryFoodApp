import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import {Colors, Fonts, Images} from '../contants';

const CategoryMenuItem = ({name, logo, activeCategory, setActiveCategory}:any) => {
  return (
    <TouchableOpacity
    onPress={() => setActiveCategory(name)}
    style={styles.category}>
      <Image
        source={Images[logo as keyof typeof Images]}
        style={[styles.categoryIcon, {opacity: activeCategory === name ? 1 : 0.5}]}/>
        
       <Text style={[styles.categoryText,{ opacity: activeCategory === name ? 1 : 0.5}]}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  category : {
    alignItems: 'center',
    marginTop:0,
  },
  categoryIcon:{
    height: 30,
    width: 30,
   
  },
  categoryText:{
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    marginTop: 5,
   
  },
});

export default CategoryMenuItem;