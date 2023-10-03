import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image, TouchableOpacity
} from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import { OrderCard, OrderComingCard, Separator } from '../components';
import { OrderService } from '../services';
import { Display } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import OrderAction from '../actions/OrderAction';
const HistoryOrderScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(OrderAction.getOrderHistory());
    }, [])
    const orderHistory = useSelector((state: any) => state?.orderState.orderHistory);
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
                                <OrderComingCard
                                    {...item}
                                    restaurant={item.restaurant[0]}
                                    navigate={navigation}
                                    key={item.id}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </>) : (
                <>
                    <View style={styles.emptyCartContainer}>
                        <Image
                            style={styles.emptyCartImage}
                            source={Images.EMPTY_ORDER_HISTORY}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyCartSubText}>
                            Let's create a lot of happy eating memories with DeliveryFood
                        </Text>

                        <Separator height={Display.setHeight(15)} />
                    </View>
                </>
            )}
            <Separator height={Display.setHeight(8)} />
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

export default HistoryOrderScreen;