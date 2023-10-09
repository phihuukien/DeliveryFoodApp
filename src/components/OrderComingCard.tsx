import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../contants";
import { Display } from "../utils";
import { StaticImageService } from "../services";
import moment from 'moment';
const OrderComingCard = ({openModel, id,quantity,orderCode, paymentMothod, deliveringStatus, priceTotal, dateCreated, restaurant ,navigate}: any) => {
  const dataFormat = moment(dateCreated).format('YYYY/MM/DD -- hh:mm:ss a');
  return (
    <View style={styles.container}>
      <View style={styles.textDate}>
      <Text>{orderCode} </Text>
        <Text style={{ marginLeft: 10, marginRight: 10, color: Colors.DEFAULT_GREEN }}>||</Text>
        <Text>{dataFormat}</Text>

      </View>
      <View style={styles.subcontainer}>
        <TouchableOpacity activeOpacity={0.8} 
        onPress={()=> navigate.navigate("DetailOrderTrackingScreen",{orderId:id})}>
          <Image
            style={styles.image}
           
            source={{ uri: StaticImageService.getPoster(restaurant.images.poster) }}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <TouchableOpacity activeOpacity={0.8} >
            <Text numberOfLines={1} style={styles.titleText}>
              {restaurant.name}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
              {paymentMothod === 1 ? "Payment on delivered" : "Prepayment"}
            </Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.priceText}>$ {priceTotal} ( {quantity} mon)</Text>
            {deliveringStatus == 1 || deliveringStatus == 2 || deliveringStatus == 3?
             <TouchableOpacity activeOpacity={0.8} 
             onPress={() => openModel(id,true)}
             style={{backgroundColor:Colors.DEFAULT_RED, paddingHorizontal:10,paddingVertical:3,borderRadius:5}} >
            <Text style={{color:Colors.DEFAULT_WHITE}}>Cancel</Text>
            </TouchableOpacity>
            :
            <></>}
           
          </View>

        </View>
      </View>
      <View style={styles.statusFooter}>
        <View>
          <Text>Ordered </Text>
        </View>
        <View>
          <Text style={{color:Colors.DEFAULT_GREEN}}>
            {(() => {
              switch (deliveringStatus) {
                case 1:
                  return "Looking for a driver"
                case 2:
                  return "The driver has been found"
                case 3:
                  return "Order Processing"
                case 4:
                  return "On The Way"
                  case 5:
                    return "Deliverred"
                    case 6:
                      return "Cancel"
              }
            })()}
          </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.LIGHT_GREY,
  },
  textDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  statusFooter: {
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  textFooter: {
  },
  subcontainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: Display.setWidth(60),
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});
export default OrderComingCard;