import { View,Text, StyleSheet, Pressable, ImageBackground, Image} from "react-native";
import React,{ useEffect, useState } from "react";
import MapView, {Marker, Polyline} from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { CarregarEndereco } from "../functions/Carregar";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import image1 from "../assets/image1.jpg";
import lab from "../assets/Paper.gif";


export default function MapRotas(){

  const [address, definirAddress] = useState("")
  const [coordinates, setCoordinates] = useState(null);
  const [localizacao, definirLocalizacao ] = useState({});
  const navigation = useNavigation();
  
  useEffect(function() {
    // Local atual
    async function ObterLocaizacao(){
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync({}))
    }
    ObterLocaizacao()
  }, [])

  // Clicar no link
  function click(){
    navigation.navigate('Home')
  }

  useFocusEffect(React.useCallback(() => {
    // Executado quando a tela estiver em foco
    CarregarEndereco().then(function(dados){
      const add = JSON.parse(dados || "{}")
      getCoordinates(add);
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
          // console.error(error);
          // navigation.navigate("Home")
        }
      };
      fetchRoute();
    });
  }, [])
)

  // Coordenadas de destino
  const getCoordinates = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 2
        }
      });
      if (response.data.length > 0) {
        const {lat, lon} = response.data[0];
        return setCoordinates({latitude: parseFloat(lat), longitude: parseFloat(lon)});
      } else {
        alert("Endereco não encontrado")
        // navigation.navigate("Home")
      }
    } catch (error) {
      // console.error(error);
      return null;
    }
  };


  useEffect(() =>{
    getCoordinates(address);
  }, [address])


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
        // console.error(error);
        navigation.navigate("Home")
      }
    };
    fetchRoute();
  }, [coordinates])

  return <>
      {
        Object.keys(localizacao).length > 0 &&
        <>
          {coordinates && ( 
            <View>
               {/* <Text>Latitude: {coordinates.latitude}</Text>
               <Text>Longitude: {coordinates.longitude}</Text>
               <Text>Latitude: {localizacao.coords.latitude}</Text>
               <Text>Longitude: {localizacao.coords.longitude}</Text> */}
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
                <Marker coordinate={{latitude: coordinates.latitude, longitude: coordinates.longitude}}/>
              {route.length > 0 && <Polyline coordinates={route} strokeColor="#000" strokeWidth={3} />}
              </MapView>
            </View>
            )}
        </>  
      } 
      {
        coordinates == undefined && <ImageBackground source={image1} style={styles.zero}>
            <View style={styles.card}>
              <Pressable onPress={click}>
                <Text style={styles.text}>Buscar Endereço</Text>
              </Pressable>
              <Image source={lab} style={{height:350, width:350, justifyContent:'center'}}/>
            </View>
          </ImageBackground>
      }
  </>  
}

const styles = StyleSheet.create({
  tela: {flex: 1},
  indicador: {backgroundColor:"#144272", padding:32,},
  indicadorTexto: {color:"white", fontSize:20,},
  map: {
    height: "100%", width: "100%",
    marginTop: 30,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  zero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "auto",
    width: "100%"

  },
  card: {
    backgroundColor: "#373B35",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  }
});