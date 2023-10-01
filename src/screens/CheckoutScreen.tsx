
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import { DeliveryAddress, FoodCard, FoodCheckoutCard, Separator } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Display } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { CartAction, GeneralAction } from '../actions';
import { OrderService } from '../services';
import OrderAction from '../actions/OrderAction';

const CheckoutScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch<any>();
  const { restaurantId ,grandTotal,itemTotal} = route.params;
  const cart = useSelector((state: any) => state?.cartState?.cartDetail);
  
  const userData = useSelector(
    (state: any) => state?.generalState?.userData,
  );
  const arrayCart: { foodId: any; count: any; }[] = [];
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMothod, setPaymentMothod] = useState(1);

  cart?.cartItems?.filter((item:any)=>item?.food[0]?.restaurantId === restaurantId).map((item: any) => {
    arrayCart?.push({ "foodId": item.foodId, "count": item.count });
  }
  )

  const addOrder = () => {
    let order = {
      CartOrder: arrayCart,
      Quantity: itemTotal,
      DeliveryAddress: "ha noi, Viet Nam",
      Note: note,
      paymentMothod: paymentMothod,
      restaurantId:restaurantId,
      phoneAddress:"0182424343",
      priceTotal: grandTotal,
      username: userData.username,
     
    };

    OrderService.addOrder(order).then((response)=>{
        if(response?.status){
          dispatch(CartAction.getCartItemsdDetailSetReduer());
          dispatch(CartAction.getCartItemsSetReduer());
          dispatch(OrderAction.getOrderComing());
          navigation.navigate("SuccessOrder");
        }else{
          console.log(response.message)
        }
    })

  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView>
        <DeliveryAddress />
        <View style={styles.foodList}>

          {cart?.cartItems?.filter((item: any) => item?.food[0].restaurantId === restaurantId)
            ?.map((item2: any) => (
              <FoodCheckoutCard
                {...item2?.food[0]}
                key={item2?.food[0]?.id}

              />
            ))}
        </View>
        <View style={styles.promoCodeContainer}>
          <View style={styles.rowAndCenter}>
            <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />
            <Text style={styles.promoCodeText}>Add Promo Code</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={Colors.DEFAULT_BLACK}
          />
        </View>
        <View style={styles.amountContainer}>
          <View style={styles.amountSubContainer}>
            <Text style={styles.amountLabelText}>Item Total</Text>
            <Text style={styles.amountText}>
              $ {grandTotal.toFixed(2)} ({itemTotal} mon)
            </Text>
          </View>
          <View style={styles.amountSubContainer}>
            <Text style={styles.amountLabelText}>Discount</Text>
            <Text style={styles.amountText}>
              $ 0.00
            </Text>
          </View>
          <View style={styles.amountSubContainer}>
            <Text style={styles.amountLabelText}>Delivery Fee</Text>
            <Text
              style={{ ...styles.amountText, color: Colors.DEFAULT_GREEN }}>
              Free
            </Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>
            $ {grandTotal.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}
          onPress={() => addOrder()}
        >
          <View >
            <Text style={styles.checkoutText}>Conform order</Text>
          </View>

        </TouchableOpacity>
        <Separator height={Display.setHeight(9)} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: Display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: Display.setWidth(80),
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: Display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
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
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
});

export default CheckoutScreen;