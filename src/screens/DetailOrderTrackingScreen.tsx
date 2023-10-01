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
import { Fonts, Images } from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { OrderService } from '../services';
import Separator from '../components/Separator ';
import Colors from '../contants/Colors';
import moment from 'moment';
import { Display } from '../utils';
import FoodOrderCard from '../components/FoodOrderCard';

const DetailOrderTrackingScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<any>()
  const [orderDetail, setOrderDetail] = useState<any>()
  useEffect(() => {
    OrderService.getOrderDetail(orderId).then((response: any) => {
      if (response.status) {
        setOrderDetail(response.orderDetail)
        setOrder(response.data)
      }
    })
  }, [])
  const dataFormat = moment(order?.dateCreated).format('YYYY/MM/DD');

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
        <Text style={styles.headerTitle}>Order Detail</Text>
      </View>
      <View style={styles.amountContainer}>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }} >
          <Text style={styles.amountLabelText}>{(() => {
            switch (order?.deliveringStatus) {
              case 2:
                return "-- Confirmed --"
              case 3:
                return "-- Order processing --"
              case 4:
                return "-- On Thy Way --"
              case 5:
                return "-- Deliverred --"
            }
          })()}</Text>
          {(() => {
            switch (order?.deliveringStatus) {
              case 2:
                return <Image
                  style={{ borderRadius: 5, marginLeft: 5 }}
                  source={require('../assets/images/delivery/confirmed.png')} />
              case 3:
                return <Image
                  style={{ borderRadius: 5, marginLeft: 5 }}
                  source={require('../assets/images/delivery/OrderProcessing.png')} />
              case 4:
                return <Image
                  style={{ borderRadius: 5, marginLeft: 5 }}
                  source={require('../assets/images/delivery/OnThyWay.png')} />
              case 5:
                return <Image
                  style={{ borderRadius: 5, marginLeft: 5 }}
                  source={require('../assets/images/delivery/deliverred.png')} />
            }
          })()}
        </View>
        <View style={styles.amountSubContainer}>
          <Text style={styles.amountLabelText}>Order code: <Text style={styles.amountText}>
            {order?.orderCode}
          </Text></Text>
        </View>
        <View style={styles.amountSubContainer}>
          <Text style={styles.amountLabelText}>Delivering From : <Text style={styles.amountText}>
            {order?.restaurant[0].location}
          </Text></Text>
        </View>
        <View style={styles.amountSubContainer}>
          <Text style={styles.amountLabelText}>To : <Text style={styles.amountText}>
            {order?.deliveryAddress}
          </Text></Text>
        </View>
        <View style={styles.amountSubContainer}>
          <Text style={styles.amountLabelText}>{order?.user[0].username} |  {order?.phoneAddress}</Text>
        </View>
        <View style={styles.amountSubContainer}>
          <Text style={styles.amountLabelText}>Date Delivering :<Text style={styles.amountText}>
            {dataFormat}
          </Text> </Text>
        </View>
        <View style={styles.amountSubContainer}>
          {order?.paymentMothod == 1 ?
            <Text style={styles.amountLabelText}>Paymen Method : <Text style={styles.amountText}>
              Payment on delivered</Text></Text>
            :
            <Text style={styles.amountLabelText}>Paymen Method : <Text style={styles.amountText}>
              Prepayment</Text></Text>
          }

        </View>
      </View>
      <ScrollView>
        <View style={styles.foodList}>
          {orderDetail?.map((item: any) => (
            <FoodOrderCard
              {...item}
              foods={item.foods[0]}
              key={item.id}
            />
          ))}

        </View>
        <View style={styles.amountContainer}>
          <View style={styles.amountSubContainer}>
            <Text style={styles.amountLabelText}>Item Total</Text>
            <Text style={styles.amountText}>
              $  {order?.priceTotal} ({order?.quantity} mon)
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
            {order?.priceTotal}
          </Text>
        </View>
      </ScrollView>
      <Separator height={Display.setHeight(5)} />
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
  gettingStartedButtonText: {
    fontSize: 15,
    color: Colors.DEFAULT_GREEN,
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default DetailOrderTrackingScreen;