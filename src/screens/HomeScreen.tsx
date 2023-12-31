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
import { Display } from '../utils';
import { RestaurantsService } from '../services';
import LoadingStartScreen from './LoadingStartScreen';
import { useDispatch } from 'react-redux';
import { BookmarkAction, GeneralAction } from '../actions';
import TagService from '../services/TagService';

const sortStyle = (isActive: boolean) =>
  isActive
    ? styles.sortListItem
    : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE };

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<any>();
  const [activeCategory, setActiveCategory] = useState();
  const [restaurants, setRestaurants] = useState<any[]>();
  const [activeSortItem, setActiveSortItem] = useState('recent');
  const [tags, setTags] = useState<any>();
  const [restaurantsByRate, setRestaurantsRate] = useState<any[]>();
  useEffect(() => {
    RestaurantsService.getRestaurants().then(response => {
      if (response.status) {
        setRestaurants(response.data.data)
        console.log("=========",response.data.data)
        dispatch(GeneralAction.setIsAppLoadingStart(100));
        dispatch(BookmarkAction.getBookmarks());
      }
    });
    TagService.getAllTags().then((response: any) => {
     
      setTags(response.data)
    })

    RestaurantsService.getRestaurantByRate().then(response =>{
      setRestaurantsRate(response.data)
    })


  }, []);

  return (
    <>
      {restaurants === undefined ?
        <LoadingStartScreen /> :
        <View style={styles.container}>
          <FocusAwareStatusBar backgroundColor={Colors.DEFAULT_GREEN} barStyle="light-content" translucent></FocusAwareStatusBar>
          <Separator height={StatusBar.currentHeight} />
          <View style={styles.backgroundCurvedContainer} />
          <View style={styles.headerContainer}>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={15}
                color={Colors.DEFAULT_WHITE}
              />
              <Text style={styles.locationText}>Delivered to</Text>
              <Text style={styles.selectedLocationText}>HOME</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color={Colors.DEFAULT_YELLOW}
              />
              <Feather
                name="bell"
                size={24}
                color={Colors.DEFAULT_WHITE}
                style={{ position: 'absolute', right: 0 }}
              />
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>12</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              >
            <View style={styles.searchContainer}>
             
              <View style={styles.searchSection}>
                <Ionicons
                  name="search-outline"
                  size={25}
                  color={Colors.DEFAULT_GREY}
                />
                <Text style={styles.searchText} >Search..</Text>
              </View>
             
              <Feather
                name="sliders"
                size={20}
                color={Colors.DEFAULT_YELLOW}
                style={{ marginRight: 10 }}
              />
            </View>
            </TouchableOpacity>
            <View style={styles.categoriesContainer}>
              {tags?.map((item: any) => (
                <CategoryMenuItem
                  {...item}
                  key={item.id}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  navigate={() =>
                    navigation.navigate("RestaurantsByTag", { tagName: item?.name })
                  }
                />
              ))}
            </View>
          </View>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.horizontalListContainer}>
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>Top Rated</Text>
                <Text style={styles.listHeaderSubtitle}>See All</Text>
              </View>
              <FlatList
                data={restaurantsByRate}
                keyExtractor={(item: any) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Separator width={20} />}
                ListFooterComponent={() => <Separator width={20} />}
                ItemSeparatorComponent={() => <Separator width={10} />}
                renderItem={({ item }: any) => (
                  <RestaurantCard
                    {...item}
                    navigate={navigation}
                  />
                )}
              />
            </View>
            <View style={styles.sortListContainer}>
              <Text style={styles.sortListItemText}></Text>
            </View>
            {
              restaurants?.map((item) => {
                return (
                  <RestaurantMediumCard {...item} key={item?.id}
                    navigate={navigation}
                  />
                )
              })
            }
            <Separator height={Display.setHeight(15)} />
          </ScrollView>
        </View>
      }
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 26,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
});

export default HomeScreen;