import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image} from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import { Separator } from '../components';
import { OrderService } from '../services';
import { Display } from '../utils';
import OrderedCard from '../components/OrderedCard';

const ReviewScreen = ({ navigation }: any) => {
  const [orderHistory, setOrderHistory] = useState<any>();
  useEffect(() => {
    OrderService.getOrderHistory().then((response) => {
      if (response?.status) {
        setOrderHistory(response?.data);
      } else {
        console.log(response.message);
      }
    })
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      {orderHistory ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.foodList}>
              {orderHistory?.map((item: any) => (
                <OrderedCard
                  {...item}
                  restaurant={item.restaurant[0]}
                  key={item.id}
                  navigate={() =>
                    navigation.navigate("ReviewAction",{ orderId: item?.id })
                  }
                />
              ))}
            </View>
          </ScrollView>
          <View>
            <Text>
              order history
            </Text>
          </View>
        </>) : (
        <>
          <View style={styles.emptyCartContainer}>
            <Image
              style={styles.emptyCartImage}
              source={Images.EMPTY_ORDER_HISTORY}
              resizeMode="contain"
            />
            <Text style={styles.emptyCartSubText}>
              There's no order to review
            </Text>

            <Separator height={Display.setHeight(15)} />
          </View>
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodList: {
    marginHorizontal: 7,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyCartSubText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
    padding: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
})

export default ReviewScreen;