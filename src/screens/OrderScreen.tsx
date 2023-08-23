import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { OrderCard, Separator } from '../components';
import { Colors, Fonts, Images } from '../contants';
import { Display } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
const OrderScreen = ({ navigation }: any) => {
  const cart = useSelector((state: any) => state?.cartState?.cart);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      {cart?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cart.map((item: any) => (
                <OrderCard
                  {...item}
                  restaurant={item.restaurant[0]}
                  key={item.id}
                  navigate={(restaurantId: any) =>
                    navigation.navigate('RestaurantScreen', { restaurantId: restaurantId })
                  }
                />
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Cart Empty</Text>
          <Text style={styles.emptyCartSubText}>
            Go ahead and order some tasty food
          </Text>
         
          <Separator height={Display.setHeight(15)} />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodList: {
    marginHorizontal: 70,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  }
  
})
export default OrderScreen;