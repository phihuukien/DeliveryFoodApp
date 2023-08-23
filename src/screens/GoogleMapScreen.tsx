import { StyleSheet } from "react-native";
import { View } from "react-native";
import MapView ,{ PROVIDER_GOOGLE }from "react-native-maps";
import { useDispatch } from "react-redux";
import { GeneralAction } from "../actions";
import { useEffect } from "react";

const GoogleMapScreen = ()=>{
    const dispatch = useDispatch<any>();
 
    useEffect(()=>{
        dispatch(GeneralAction.setIsAppLoadingStart(-1));
    },[])
    return (
        <View style={styles.container}>
     <MapView
      
       style={styles.map}
       initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
     </MapView>
   </View>
    )
}
const styles = StyleSheet.create({
    container: {
     flex:1
    },
    map: {
      flex:1
    },
   });
export default  GoogleMapScreen;