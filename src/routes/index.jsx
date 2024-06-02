import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/Map";
import Home from "../screens/Home";
import {Ionicons, FontAwesome5} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export function Routes(){
  return <Tab.Navigator
  screenOptions={{
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      backgroundColor: "#fff",
      borderTopWidth:0,
    },
    tabBarActiveTintColor: "#000",
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
  </Tab.Navigator>
}