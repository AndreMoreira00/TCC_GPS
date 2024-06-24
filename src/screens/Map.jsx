import { View, StyleSheet} from "react-native";
import React,{ useEffect, useState } from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";

export default function Map(){

  const [localizacao, definirLocalizacao ] = useState({});

  useEffect(function() {
    async function ObterLocalizacao() {
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync({}))
    }
    ObterLocalizacao();
  }, [])

  return(
    <View>
      {
        Object.keys(localizacao).length > 0 &&
        <>
          <View>
            <MapView 
              initialRegion={{
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
              style={styles.map}
            >
              <Marker coordinate={{latitude: localizacao.coords.latitude, longitude: localizacao.coords.longitude}}/>
            </MapView>
          </View>
        </>  
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {flex: 1},
  indicador: {backgroundColor:"#144272", padding:32,},
  indicadorTexto: {color:"white", fontSize:20,},
  map: {
    height: "100%", width: "100%",
    marginTop: 30,
  },
});