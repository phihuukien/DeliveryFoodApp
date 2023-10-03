import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {
    CategoryMenuItem,
    FocusAwareStatusBar,
    RestaurantCard,
    RestaurantMediumCard,
    Separator,
} from '../components';
import { Colors, Fonts, Mock } from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import filter from 'lodash.filter'

const Search = ({ navigation }: any) => {
    const [foodName, setfoodName] = useState('');
    
    // const handleSearch =({query}:any)=>{
    //     setfoodName(foodName);
    //     const formattedQuery = query.toLowerCase();
    //     const filteredData = filter()
    // }


        // console.log(foodName);
        // 

    return (
        <>
            <View style={styles.container}>
                <FocusAwareStatusBar backgroundColor={Colors.DEFAULT_WHITE} barStyle="dark-content" translucent></FocusAwareStatusBar>
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.back}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={40}
                        onPress={() => navigation.goBack()}
                         style={{ marginTop: 20}}
                    />
                    <View style={styles.searchContainer}>

                        <View style={styles.searchSection}>
                            <Ionicons
                                name="search-outline"
                                size={25}
                                color={Colors.DEFAULT_GREY}
                            />
                            <TextInput
                                style={styles.searchText}
                                onChangeText={text => setfoodName(text)}
                                placeholderTextColor={Colors.DEFAULT_GREY}
                                placeholder='Search..' />
                            <Feather
                                name="sliders"
                                size={20}
                                color={Colors.DEFAULT_YELLOW}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ResultSearch',{foodName:foodName})}>
                                <Text style={styles.exit}>find</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.historyContainer}>
                    <Text style={styles.historyText} >History</Text>

                    <Text style={styles.clearText} >Clear All</Text>
                </View>
                <View style={styles.historyContainer}>
                    <Text style={styles.historyItem}>Mcdonalds</Text>
                    <MaterialIcons
                        style={styles.historyX}
                        name="cancel"
                        size={25}
                        color={Colors.DEFAULT_GREY}
                    />
                    <View style={styles.boder} />

                </View>
                <View style={styles.historyContainer}>
                    <Text style={styles.historyItem}>Coffee</Text>
                    <MaterialIcons
                        style={styles.historyX}
                        name="cancel"
                        size={25}
                        color={Colors.DEFAULT_GREY}
                    />
                    <View style={styles.boder} />

                </View>
                <View style={styles.historyContainer}>
                    <Text style={styles.historyItem}>Pizza Hut</Text>
                    <MaterialIcons
                        style={styles.historyX}
                        name="cancel"
                        size={25}
                        color={Colors.DEFAULT_GREY}
                    />
                    <View style={styles.boder} />

                </View>
                <View style={styles.viewMore}>
                    <Text style={styles.viewMoreText}>
                        View More
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color={Colors.DEFAULT_YELLOW}
                    />
                </View>
            </View>



        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    back: {
        left:-20,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 45,
        borderColor: Colors.LIGHT_GREY2,
        borderWidth: 1,
        borderRadius: 50,
        width: 330,
        marginRight:5,
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
        width: 250,
        color: Colors.DEFAULT_GREY,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    historyContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },

    historyItem: {
        marginHorizontal: 10,
        color: Colors.DEFAULT_GREY,
        alignContent: 'center',
    },
    historyX: {
        color: Colors.DEFAULT_GREY,
        marginHorizontal: 10,
        fontSize: 20,
        right: 0,
        position: 'absolute',
    },
    historyText: {
        width: 250,
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        marginLeft: 10,
    },
    clearText: {
        color: Colors.DEFAULT_GREEN,
        fontSize: 16,
        right: 0,
        position: 'absolute',
    },
    exit: {
        width: 250,
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        marginLeft: 15,
    },
    boder: {
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.LIGHT_GREY2
    },
    viewMore: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
    },
    viewMoreText: {
        color: Colors.DEFAULT_YELLOW,
        marginLeft: 5,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
    },

});

export default Search;