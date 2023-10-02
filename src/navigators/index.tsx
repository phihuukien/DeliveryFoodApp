import { Text } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CartScreen,
  CheckoutScreen,
  FoodScreen,
  ForgotPasswordScreen,
  HomeScreen,
  LoadingStartScreen,
  RegisterPhoneScreen,
  RestaurantScreen,
  RestaurantsByTagScreen,
  SigninScreen,
  SignupScreen,
  SplashScreen,
  SuccessOrder,
  VerificationScreen,
  WelcomeScreen
} from "../screens";
import { useSelector, useDispatch } from 'react-redux';
import { BookmarkAction, CartAction, GeneralAction } from "../actions";
import { AnyAction } from "redux";
import HomeTabs from './BottomTabs';
import OrderTabs from './TopTabs';
import ReviewScreen from "../screens/ReviewScreen";
import ReviewActionScreen from "../screens/ReviewActionScreen";
const Stack = createNativeStackNavigator();

const Navigators = () => {
  const { isAppLoading, token, isFirstTimeUse, userData } = useSelector(
    (state: any) => state?.generalState,
  );
  console.log('isAppLoading ;', isAppLoading);
  console.log('token ;', token);
  console.log('isFirstTimeUse ;', isFirstTimeUse);
  console.log('userData ;', userData);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(GeneralAction.appStart());

  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAppLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}></Stack.Screen>
            )}
            <Stack.Screen name="SigninScreen" component={SigninScreen}></Stack.Screen>
            <Stack.Screen name="SignupScreen" component={SignupScreen}></Stack.Screen>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}></Stack.Screen>
            <Stack.Screen name="RegisterPhoneScreen" component={RegisterPhoneScreen}></Stack.Screen>
            <Stack.Screen name="VerificationScreen" component={VerificationScreen}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="SuccessOrder" component={SuccessOrder} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="ReviewAction" component={ReviewActionScreen} />
            <Stack.Screen name="RestaurantsByTag" component={RestaurantsByTagScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

  )
}
export default Navigators;