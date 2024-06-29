import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/Map";
import Home from "../screens/Home";
import Perfil from "../screens/Perfil";
import Salvos from "../screens/Salvos";
import {Ionicons, FontAwesome5, MaterialIcons, Entypo, Fontisto} from "@expo/vector-icons";
import MapRotas from "../screens/MapRotas";


const Tab = createBottomTabNavigator();

export function Routes(){
  return <Tab.Navigator
  screenOptions={{
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      backgroundColor: "#000",
      borderTopWidth:0,
    },
    tabBarActiveTintColor: "#5C5CF7",
  }}>
    <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarIcon:({focused, size, color}) =>{
        if (focused){
          return <Ionicons name="home-sharp" size={size} color={color}/>
        }
        return <Ionicons name="home-outline" size={size} color={color}/>
    }
    }}/>
    <Tab.Screen
    name="Map"
    component={Map}
    options={{
      tabBarIcon:({focused, size, color}) =>{
        if (focused){
          return <FontAwesome5 name="map-marked" size={size} color={color}/>
        }
        return <FontAwesome5 name="map-marked-alt" size={size} color={color}/>
    }
    }}/>
    <Tab.Screen
    name="MapRotas"
    component={MapRotas}
    options={{
      tabBarIcon:({focused, size, color}) =>{
        if (focused){
          return <Fontisto name="map" size={size+8} color={color}/>
        }
        return <Fontisto name="map" size={size+12} color={color}/>
    }
    }}/>
    <Tab.Screen
    name="Salvos"
    component={Salvos}
    options={{
      tabBarIcon:({focused, size, color}) =>{
        if (focused){
          return <Entypo name="list" size={size} color={color}/>
        }
        return <Entypo name="list" size={size} color={color}/>
    }
    }}/>
    <Tab.Screen
    name="Perfil"
    component={Perfil}
    options={{
      tabBarIcon:({focused, size, color}) =>{
        if (focused){
          return <MaterialIcons name="people" size={size+10} color={color}/>
        }
        return <MaterialIcons name="people-outline" size={size} color={color}/>
    }
    }}/>
  </Tab.Navigator>
}