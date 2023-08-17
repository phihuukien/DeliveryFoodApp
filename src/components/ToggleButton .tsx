import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Easing, View } from 'react-native';
import { Colors } from '../contants';

const containerStyle = (isActive:any) => ({
  backgroundColor: isActive ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY,
  height: 32 * 0.5,
  width: 64 * 0.5,
  borderRadius: 32,
  padding: 4 * 0.5,
});

const toggleStyle = (animatedValue: any) => ({
  height: 24 * 0.5,
  width: 24 * 0.5,
  backgroundColor: Colors.DEFAULT_WHITE,
  borderRadius: 32,
  transform: [
    {
      translateX: animatedValue,
    },
  ],
});

const ToggleButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const toggleHandle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : 32 * 0.5,
      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true,
    }).start();
    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity
      style={containerStyle(isActive)}
      onPress={() => toggleHandle()}
      activeOpacity={0.8}>
      <Animated.View style={toggleStyle(animatedValue)} />
    </TouchableOpacity>
  );
};

export default ToggleButton;