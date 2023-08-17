import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "../contants";

const LoadingStartScreen = () => {
 
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <LottieView
        source={require("../assets/loadingstart.json")}
        style={{
          height: 90,
          width: 90,
          alignSelf: "center",
          marginTop: 250,
          justifyContent: "center",
        }}
        autoPlay
      />
    
    </SafeAreaView>
  );
};
export default LoadingStartScreen;