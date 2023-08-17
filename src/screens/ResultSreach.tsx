import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Colors, Fonts, Images } from "../contants";
import { Display } from "../utils";
import { FocusAwareStatusBar, Separator } from "../components";
import { StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ResultSreach = ({ navigation }: any) => {
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
                <Text style={styles.headerTitle}>Bookmarks</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchSection}>
                    <Ionicons
                        name="search-outline"
                        size={25}
                        color={Colors.DEFAULT_GREY}
                    />
                    <Text style={styles.searchText}>Search..</Text>
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
                <View style={styles.subcontainer}>
                    <View>
                        <Image
                            source={require('../assets/images/kfc.png')}
                            style={styles.posterStyle}
                        />
                    </View>
                    <View style={styles.labelContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>KFC</Text>
                            <View style={styles.rowAndCenter}>
                                <Ionicons
                                    name={'bookmark-outline'}
                                    color={Colors.DEFAULT_YELLOW}
                                    size={24} />
                            </View>
                        </View>
                        <Text style={styles.tagsText}>chichken</Text>
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
                                <Text style={styles.deliveryDetailsText}>30 min</Text>
                            </View>
                            <View style={styles.rowAndCenter}>

                                <Text style={styles.deliveryDetailsText}></Text>
                            </View>
                        </View>
                    </View>
                </View>
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