import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import TagService from '../services/TagService';
import { StaticImageService } from '../services';

const CategoryMenuItem = ({ name, image, activeCategory, setActiveCategory, navigate }: any) => {
  return (
    <TouchableOpacity
      // onPress={() => setActiveCategory(name)}
      onPress={() => navigate()}
      style={styles.category}>
      <Image
        source={{ uri: StaticImageService.getLogoTag(image) }}
        style={[styles.categoryIcon, { opacity: activeCategory === name ? 1 : 0.5 }]} />

      <Text style={[styles.categoryText, { opacity: activeCategory === name ? 1 : 0.5 }]}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    marginTop: 0,
  },
  categoryIcon: {
    height: 30,
    width: 30,

  },
  categoryText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    marginTop: 5,

  },
});

export default CategoryMenuItem;