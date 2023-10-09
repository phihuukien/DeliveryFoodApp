import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Modal,
    Alert,
    Pressable,
    TextInput
} from 'react-native';
const config = require('../../package.json').projectConfig;

import { Colors, Fonts, Images } from '../contants';
import { OrderComingCard, Separator } from '../components';
import { OrderService } from '../services';
import { Display } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import OrderAction from '../actions/OrderAction';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ReviewAction from '../actions/ReviewAction';

const OrderTrackingScreen = ({ navigation }: any) => {
    const [cancelReason, setcancelReason] = useState('');
    const [orderId, setOrderId] = useState('');
    const linkRealtime = config.linkRealtime;
    const dispatch = useDispatch<any>();
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        dispatch(OrderAction.getOrderComing());
        const connection = new HubConnectionBuilder()
            .withUrl(linkRealtime)
            .build();
        connection.on('SendStutusToMobileForShipper', (message) => {
            dispatch(OrderAction.getOrderHistory());
            dispatch(OrderAction.getOrderComing());
            dispatch(ReviewAction.getREVIEW());
        });

        connection.start()
            .then(() => {
                console.log('Connected to hub.');
            })
            .catch((error) => {
                console.log('Error connecting to hub:', error);
            });
        return () => {
            connection.stop();
        };

    }, [])
    const cancel=()=>{
        let order = {
            OrderId:orderId,
            Reason:cancelReason
        }
        OrderService.cancelOrder(order).then((response:any)=>{
            if(response.status){
                setModalVisible(!modalVisible)
            }
        })
    }
    const openModel = (orderId:string, modelOpen:boolean)=>{
        setModalVisible(modelOpen);
        setOrderId(orderId);
    }
    const orderComming = useSelector((state: any) => state?.orderState?.orderComming);
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
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>cancellation reason!</Text>

                        <TextInput
                            placeholder="reason"
                            placeholderTextColor={Colors.DEFAULT_GREY}
                            selectionColor={Colors.DEFAULT_GREY}
                            style={{
                                borderWidth: 1, padding: 3, borderRadius: 3,
                                borderColor: Colors.DEFAULT_GREY,width:300
                            }}
                            onChangeText={text => setcancelReason(text)}
                        />
                        <View style={{ flexDirection: 'row' , marginTop:10}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Exits</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => cancel()}>
                                <Text style={styles.textStyle}>confirm cancel</Text>
                            </Pressable>

                        </View>

                    </View>
                </View>
            </Modal>
            {orderComming.length > 0 ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.foodList}>
                            {orderComming?.map((item: any) => (
                                <OrderComingCard
                                    {...item}
                                    restaurant={item.restaurant[0]}
                                    navigate={navigation}
                                    openModel={openModel}
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
    buttonClose: {
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    buttonCancel: {
        backgroundColor: Colors.DEFAULT_RED,
        marginLeft:20
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
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
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