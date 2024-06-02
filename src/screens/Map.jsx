import { View,Text,Button, StyleSheet} from "react-native";
import React,{ useEffect, useState } from "react";
import MapView, {Marker, Polyline} from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

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
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error('No coordinates found for the given address');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Map(){

  const [ localizacao, definirLocalizacao ] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [route, setRoute] = useState([])

  useEffect(function() {
    async function ObterLocalizacao() {
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync({}))
    }
    
    
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
    ObterLocalizacao();
    handleButtonClick();
    fetchRoute();
  }, [])

  const handleButtonClick = async() => {
    const address = 'Estr. dos Romeiros, 795 - Centro, Barueri - SP, Brazil';
    const coords = await getCoordinates(address);
    setCoordinates(coords);
  };

  return(
    <View>
      {
        Object.keys(localizacao).length > 0 &&
        <>
          <Button title="Obter Coordenadas" onClick={handleButtonClick} style={styles.button}/>
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
                <Marker coordinate={{latitude: coordinates.latitude,longitude: coordinates.longitude}}/>
              {route.length > 0 && <Polyline coordinates={route} strokeColor="#000" strokeWidth={3} />}
              </MapView>
            </View>
            )}
          {/* <View>
            <Text>Error</Text>
          </View> */}
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
  button: {
    backgroundColor: "black",
    border: 0,
    padding: 10,
    width: 200,
    height: 50,
    display: "inline-block",
    margin: 10,
    cursor: "pointer",
    borderradius: 4,
  },
});