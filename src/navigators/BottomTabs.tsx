import React, { useEffect } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    AccountScreen,
    BookmarkScreen,
  CartScreen,
  GoogleMapScreen,
  HomeScreen,
  LoadingStartScreen,
  OrderScreen,
  ResultSreach,
  SuccessOrder,
} from '../screens';
import OrderTabs from './TopTabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Display} from '../utils';
import {Colors} from '../contants';

import { useSelector, useDispatch } from 'react-redux';
const BottomTabsN = createBottomTabNavigator();

const BottomTabs = () =>{
  const isLoadingStart = useSelector(
    (state: any) => state?.generalState.isLoadingStart,
  );
return (

  <BottomTabsN.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: Display.setHeight(8),
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopWidth: 0,
        zIndex:isLoadingStart
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.DEFAULT_GREEN,
      tabBarInactiveTintColor: Colors.INACTIVE_GREY,
    }}>
    <BottomTabsN.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
     <BottomTabsN.Screen
      name="GoogleMapScreen"
      component={GoogleMapScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabsN.Screen
      name="BookmarkScreen"
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="bookmark-outline" size={23} color={color} />
        ),
      }}
    />
     
    <BottomTabsN.Screen
      name="OrderTabs"
      component={OrderTabs}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="reorder-four-sharp" size={23} color={color} />
        ),
      }}
    />
   
    <BottomTabsN.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="person-outline" size={23} color={color} />
        ),
      }}
    />
  </BottomTabsN.Navigator>
)
    }
export default BottomTabs;