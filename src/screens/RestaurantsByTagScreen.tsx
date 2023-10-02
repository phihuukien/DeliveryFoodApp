import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Separator } from '../components';
import { PermissionsAndroid, Pressable, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import ReviewService from '../services/ReviewService';
import { useSelector } from 'react-redux';
import { RestaurantsService, StaticImageService } from '../services';
import { ApiContants } from '../contants';
import RestaurantTagCard from '../components/RestaurantTagCard';

const RestaurantsByTagScreen = ({ navigation, route }: any) => {
    const { tagName } = route.params

    const [restaurants, setRestaurants] = useState<any>();

    useEffect(() => {
        RestaurantsService.getOneRestaurantByTag(tagName).then(response => {
            setRestaurants(response.data)

        });
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Separator height={StatusBar.currentHeight} />

            <View style={styles.headerTitle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Ionicons
                        name="chevron-back-outline"
                        color={'black'}
                        size={35}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.titleName}>{tagName}</Text>
                </View>
            </View>
            <ScrollView>
                {restaurants?.map((item: any) => (
                    <RestaurantTagCard
                        key={item.id}
                        {...item}
                        navigate = {navigation}
                    />
                ))}
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15
    },


});

export default RestaurantsByTagScreen;