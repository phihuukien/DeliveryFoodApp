
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Pressable,
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
  const { restaurantId, grandTotal, itemTotal } = route.params;
  const cart = useSelector((state: any) => state?.cartState?.cartDetail);

  const userData = useSelector(
    (state: any) => state?.generalState?.userData,
  );

  const arrayCart: { foodId: any; count: any; }[] = [];
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState<any>();
  const [paymentMothod, setPaymentMothod] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  // const [activePayment, setActivePayment] = useState();

  cart?.cartItems?.filter((item: any) => item?.food[0]?.restaurantId === restaurantId).map((item: any) => {
    arrayCart?.push({ "foodId": item.foodId, "count": item.count });
  }
  )
  if (userData.phone) {
    const ph = userData.phone
  }
  const activePayment = (isActive: Boolean) => {
    if (isActive) {
      setPaymentMothod(1);
    } else {
      setPaymentMothod(2);
    }
  }

  console.log(note)
  const addOrder = () => {
    let order = {
      CartOrder: arrayCart,
      Quantity: itemTotal,
      DeliveryAddress: deliveryAddress,
      Note: note,
      paymentMothod: paymentMothod,
      restaurantId: restaurantId,
      phoneAddress: phone,
      priceTotal: grandTotal,
      username: userData.username,

    };

    OrderService.addOrder(order).then((response) => {
      if (response?.status) {
        dispatch(CartAction.getCartItemsdDetailSetReduer());
        dispatch(CartAction.getCartItemsSetReduer());
        dispatch(OrderAction.getOrderComing());
        navigation.navigate("SuccessOrder");
      } else {
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delivery Information</Text>

            <TextInput
              placeholder="Delivery Address"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={{
                borderWidth: 1, padding: 3, borderRadius: 3,
                borderColor: Colors.DEFAULT_GREY, width: 300
              }}
              value={deliveryAddress}
              onChangeText={text => setDeliveryAddress(text)}

            />
            <TextInput
              placeholder="Phone "
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={{
                borderWidth: 1, padding: 3, borderRadius: 3,
                borderColor: Colors.DEFAULT_GREY, width: 300, marginTop: 20
              }}
              value={phone}
              onChangeText={text => setPhone(text)}

            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView>
        <DeliveryAddress setModalVisible={setModalVisible}
          deliveryAddress={deliveryAddress}
          phone={phone} />
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
            {/* <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />*/}
            <Text style={styles.promoCodeText}>Note: </Text>
            <TextInput
              placeholder="note ..."
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              onChangeText={text => setNote(text)}

            />
          </View>

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
        <View style={[styles.totalContainer]}>
          <Pressable onPress={()=>activePayment(true)}>
            <Text style={[styles.totalText, styles.payment, { opacity: paymentMothod  === 1 ? 1 : 0.3  }]}>payment forward</Text>
          </Pressable>
          <Pressable  onPress={()=>activePayment(false)}>
            <Text style={[styles.totalText, styles.payment, { opacity: paymentMothod  === 2 ? 1 : 0.3  }]}>
              payment in advance
            </Text>
          </Pressable>




        </View>
        <TouchableOpacity style={styles.checkoutButton}
          onPress={() => addOrder()}
        >
          <View >
            <Text style={styles.checkoutText}>Confirm order</Text>
          </View>

        </TouchableOpacity>
        <Separator height={Display.setHeight(9)} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  isActived1: {
    borderColor: Colors.DEFAULT_GREEN,
  },
  isActived2: {
    borderColor: Colors.DEFAULT_GREY,
  },
  payment: {
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 1,
    width: '100%',
    paddingVertical: 10,
    fontSize: 15,
    paddingHorizontal: 10,
    marginLeft: 5
  },
  buttonClose: {
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  buttonCancel: {
    backgroundColor: Colors.DEFAULT_RED,
    marginLeft: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    height: '250%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
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
    paddingVertical: 5,
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