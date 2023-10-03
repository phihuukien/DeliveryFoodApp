import { Image, StyleSheet, Text, FlatList} from "react-native";
import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import { Colors, Fonts, Images } from "../contants";
import { Display } from "../utils";
import { FocusAwareStatusBar, SearchItem, Separator } from "../components";
import { StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SearchService } from "../services";
import { useRoute } from '@react-navigation/native';

const ResultSreach = ({ navigation }: any) => {
    const route = useRoute();
    const { foodName }:any = route.params;
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        
        SearchService.GetRestaurantsByNameFood(foodName).then(response => {
          
                if (response.status) {
                    setRestaurant(response.data);
                    console.log(response.data);
                 
                    } 
            });
    }, []);
    console.log(restaurant);
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={Colors.DEFAULT_WHITE} barStyle="dark-content" translucent></FocusAwareStatusBar>
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Result Sreach</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchSection}>
                    <Ionicons
                        name="search-outline"
                        size={25}
                        color={Colors.DEFAULT_GREY}
                    />
                    <Text style={styles.searchText}>{foodName}</Text>
                </View>
                <Feather
                    name="sliders"
                    size={20}
                    color={Colors.DEFAULT_YELLOW}
                    style={{ marginRight: 10 }}
                />
            </View>
            <View style={styles.searchResults}>
                <View style={styles.optionResult}>
                    <Text style={styles.textOptionResult}>Near By Restaurants</Text>
                </View>
                <FlatList
                data={restaurant}
                keyExtractor={(item: any) => item.id}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Separator width={20} />}
                ListFooterComponent={() => <Separator width={20} />}
                ItemSeparatorComponent={() => <Separator width={10} />}
                renderItem={({ item }: any) => (
                  <SearchItem   
                    {...item}
                    restaurant={item.restaurant[0]}
                    navigate={(restaurantId: any) =>
                      navigation.navigate('RestaurantScreen', { restaurantId: restaurantId })
                    }
                  />
                )}
              />
            </View>
        </View>
    )
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
export default ResultSreach;