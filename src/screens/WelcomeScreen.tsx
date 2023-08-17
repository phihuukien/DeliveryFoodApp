import React, { useState, useRef } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Colors, Fonts, General } from "../contants";
import { Separator, WelcomeCard } from "../components/";
import { Display } from "../utils";
import { StorageService } from "../services";
import { GeneralAction } from "../actions";
import { useDispatch } from "react-redux";

const pageStyle = (isActive: any) =>
    isActive
        ? style.page
        : { ...style.page, backgroundColor: Colors.DEFAULT_GREY };

const Pagination = ({ index }: any) => {
    return (
        <View style={style.pageContainer}>
            {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )}
        </View>
    );
};

const WelcomeScreen = ({navigation}:any) => {
    const [welcomeListIndex, setWelcomeListIndex] = useState(0);

    const welcomeList = useRef<FlatList | null>(null);
    const onViewRef = useRef((changed: any) => {
        setWelcomeListIndex(changed.viewableItems[0].index);
    });
    
    const handNext = () => {
        welcomeList.current?.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        });
    };

    const dispatch = useDispatch();
    const navigate = () => {
        StorageService.setFirstTimeUse().then(() => {
          dispatch(GeneralAction.setIsFirstTimeUse());
        });
      };
    
   

    return (
        <View style={style.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
            />
            <Separator height={StatusBar.currentHeight} />
            <Separator height={Display.setHeight(1)} />
            <View style={style.welcomeListContainer}>
                <FlatList
                    ref={welcomeList}
                    data={General.WELCOME_CONTENTS}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.title}
                    pagingEnabled
                    overScrollMode="never"
                    horizontal

                    onViewableItemsChanged={onViewRef.current}
                    renderItem={({ item }) => <WelcomeCard {...item} />} />
            </View>
            <Separator height={Display.setHeight(8)} />
            <Pagination index={welcomeListIndex} />
            <Separator height={Display.setHeight(8)} />
            
            {welcomeListIndex === 2 ? (
                <TouchableOpacity
                    style={style.gettingStartedButton}
                    activeOpacity={0.8}
                    onPress={()=>navigate()}>
                    <Text style={style.gettingStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <View style={style.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginLeft: 10 }}
                    onPress={() => welcomeList.current?.scrollToEnd()}>
                    <Text style={style.buttonText}>SKIP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={style.button}
                    onPress={() => handNext()}>
                    <Text style={style.buttonText} >NEXT</Text>
                </TouchableOpacity>
            </View>

            )}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE
    },
    welcomeListContainer: {
        height: Display.setHeight(60),
    },
    pageContainer: {
        flexDirection: 'row',
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 32,
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Display.setWidth(90),
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.POPPINS_BOLD,
        lineHeight: 16 * 1.4,
        
    },
    button: {
        backgroundColor: Colors.LIGHT_GREEN,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 32,
    },
    gettingStartedButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
      },
      gettingStartedButtonText: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        lineHeight: 20 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },

})
export default WelcomeScreen;