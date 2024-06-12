import { View,Text, StyleSheet} from "react-native";
import React,{ useEffect, useState } from "react";
import MapView, {Marker, Polyline} from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { CarregarEndereco } from "../functions/Carregar";



export default function MapRotas(){

  const [address, definirAddress] = useState("")
  const [coordinates, setCoordinates] = useState(null);
  const [route, setRoute] = useState([]);
  const [localizacao, definirLocalizacao ] = useState({});

  // Local atual
  useEffect(function() {
    async function ObterLocaizacao(){
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync({}))
    }
    ObterLocaizacao()
  }, [])

  // Carregar endereço do Store
  useEffect(function(){
    CarregarEndereco().then(function(dados){
    const add = JSON.parse(dados || "{}")
    alert(add)
    definirAddress(add)
    });
  }, [])

  const getCoordinates = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1
        }
      });
      // console.log(response)
      if (response.data.length > 0) {
        const {lat, lon} = response.data[0];
        // console.log(lat)
        // console.log(lon)
        return setCoordinates({latitude: parseFloat(lat), longitude: parseFloat(lon)});
      } else {
        throw new Error('No coordinates found for the given address');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() =>{
    const address = 'Estr. dos Romeiros, 795 - Centro, Barueri - SP, Brazil';
    const coords = getCoordinates(address);
    // console.log(coords)
    // setCoordinates(coords)
  }, [address])

  // const teste = async() =>{
  //   const coords = await getCoordinates(address);
  //   setCoordinates(coords)
  // }

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${localizacao.coords.longitude},${localizacao.coords.latitude};${coordinates.longitude},${coordinates.latitude}?overview=full&geometries=geojson`);
        const data = response.data;
        const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
          setRoute(routeCoordinates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoute();
    // teste();
  }, [])

  return(
    <View>
      {
        Object.keys(localizacao).length > 0 &&
        <>
          {coordinates && ( 
            <View>
               <Text>Latitude: {coordinates.latitude}</Text>
               <Text>Longitude: {coordinates.longitude}</Text>
               <Text>Latitude: {localizacao.coords.latitude}</Text>
               <Text>Longitude: {localizacao.coords.longitude}</Text>
              {/* <MapView 
                initialRegion={{
                  latitude: localizacao.coords.latitude,
                  longitude: localizacao.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
                }}
                style={styles.map}
              >
                <Marker coordinate={{latitude: localizacao.coords.latitude, longitude: localizacao.coords.longitude}}/>
                <Marker coordinate={{latitude: coordinates.latitude,longitude: coordinates.longitude}}/>
              {route.length > 0 && <Polyline coordinates={route} strokeColor="#000" strokeWidth={3} />}
              </MapView> */}
            </View>
            )}
        </>  
      }
    </View>
  );
}

// const styles = StyleSheet.create({
//   tela: {flex: 1},
//   indicador: {backgroundColor:"#144272", padding:32,},
//   indicadorTexto: {color:"white", fontSize:20,},
//   map: {
//     height: "100%", width: "100%",
//     marginTop: 30,
//   },
// });