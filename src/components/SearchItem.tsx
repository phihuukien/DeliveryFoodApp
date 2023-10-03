import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StaticImageService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkAction } from '../actions';
import { Display } from "../utils";

const SearchItem = ({
    id,
    name,
    restaurant,
    navigate,
}: any) => {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => navigate(id)}>
            <View style={styles.subcontainer}>
                <View>
                    <Image
                        source={{ uri: StaticImageService.getPoster(restaurant.images.poster) }}
                        style={styles.posterStyle}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{restaurant.name}</Text>
                        <View style={styles.rowAndCenter}>
                            <Ionicons
                                name={'bookmark-outline'}
                                color={Colors.DEFAULT_YELLOW}
                                size={24} />
                        </View>
                    </View>
                    <Text style={styles.tagsText}>{name}</Text>
                    <View style={styles.deliveryDetailsContainer}>
                        <View style={styles.rowAndCenter}>
                            <Image
                                source={Images.DELIVERY_CHARGE}
                                style={styles.deliveryDetailsIcon}
                            />
                            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
                        </View>
                        <View style={styles.rowAndCenter}>
                            <Image
                                source={Images.DELIVERY_TIME}
                                style={styles.deliveryDetailsIcon}
                            />
                            <Text style={styles.deliveryDetailsText}>{restaurant.times} min</Text>
                        </View>
                        <View style={styles.rowAndCenter}>

                            <Text style={styles.deliveryDetailsText}></Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 8,
        backgroundColor: Colors.DEFAULT_WHITE,
        marginTop: 8,
    },
    posterStyle: {
        width: Display.setWidth(20),
        height: Display.setWidth(20),
        borderRadius: 10,
        margin: 5,
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
    bookmarkList: {
        marginHorizontal: 20,
    },
    searchContainer: {
        backgroundColor: Colors.LIGHT_GREY2,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchText: {
        color: Colors.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    searchResults: {
        marginHorizontal: 20,
    },
    optionResult: {
        marginVertical: 20,
    },

    textOptionResult: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 17,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deliveryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    tagsText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 7,
    },
    deliveryDetailsText: {
        marginLeft: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
});
export default SearchItem;