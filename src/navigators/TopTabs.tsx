import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HistoryOrderScreen, OrderScreen, OrderTrackingScreen, ReviewScreen } from '../screens';
import { Display } from '../utils';
import { Colors } from '../contants';

const TopTab = createMaterialTopTabNavigator();

export default () => {
  return (
    <TopTab.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'relative',
          top: 40,
        },
        tabBarIndicatorStyle: { backgroundColor: Colors.DEFAULT_GREEN },
        tabBarPressColor: 'white',
        tabBarActiveTintColor: Colors.DEFAULT_GREEN,
        tabBarInactiveTintColor: Colors.INACTIVE_GREY,
      }}>
      <TopTab.Screen
        name="OrderTrackingScreen"
        component={OrderTrackingScreen}
        options={{ tabBarLabel: 'Oncoming' }}
      />
      <TopTab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{ tabBarLabel: 'Order' }}
      />
      <TopTab.Screen
        name="HistoryOrderScreen"
        component={HistoryOrderScreen}
        options={{ tabBarLabel: 'History' }}
      />
      <TopTab.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ tabBarLabel: 'Review' }}
      />

    </TopTab.Navigator>
  );
};