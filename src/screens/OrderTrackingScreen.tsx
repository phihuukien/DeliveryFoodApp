import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';

import { Colors, Fonts, Images } from '../contants';
import { OrderComingCard, Separator } from '../components';
import { OrderService } from '../services';
import { Display } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import OrderAction from '../actions/OrderAction';

const OrderTrackingScreen = () => {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(OrderAction.getOrderComing());
    }, [])
    const orderComming = useSelector((state: any) => state?.orderState?.orderComming);
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            {orderComming.length>0 ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.foodList}>
                        {orderComming?.map((item: any) => (
                            <OrderComingCard 
                            {...item}
                            restaurant={item.restaurant[0]}
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
                            source={Images.EMPTY_ORDER}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyCartSubText}>
                            Forgot to order your food already?
                        </Text>

                        <Separator height={Display.setHeight(15)} />
                    </View>
                </>
            )}
               <Separator height={60} />
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

export default OrderTrackingScreen;