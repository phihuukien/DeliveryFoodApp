import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "../contants";
import { useDispatch } from "react-redux";
import { GeneralAction } from "../actions";

const SuccessOrder = ({navigation}:any) => {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(GeneralAction.setIsAppLoadingStart(-1));
        setTimeout(() => {
            dispatch(GeneralAction.setIsAppLoadingStart(100));
            navigation.navigate("OrderTrackingScreen");
        },2000)
    },[])
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <LottieView
        source={require("../assets/loadingsuccess.json")}
        style={{
            height: 160,
            width:200,
          alignSelf: "center",
          marginTop: 160,
          justifyContent: "center",
        }}
        autoPlay
      />
       <Text style={{marginTop:90,fontSize:19,fontWeight:"600",textAlign:"center"}}>Your order has been placed, please wait for the driver to take your order</Text>
    
    </SafeAreaView>
  );
};
export default SuccessOrder;