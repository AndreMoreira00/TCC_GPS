import {View, Text, TextInput, Pressable, ImageBackground} from "react-native";
import React, { useEffect, useState } from "react";
import { Address } from "../functions/Salvar";
import styles from "../styles/Salvos";
import { useNavigation } from "@react-navigation/native";
import image1 from "../assets/image1.jpg";


// Rodar sem mensagem de debug
// expo run --no-dev


export default function Home(){

  const navigation = useNavigation();
  const [address, definirAddress] = useState('')
  const [inicio, definirInicio] = useState(false)

  useEffect(function(){
    definirInicio(true)
    definirAddress('')
    Address(address)
  }, [inicio])

  async function SalvarAddress(){
    if (address == ''){
      definirInicio(false)
      Address(address)
    } else{
      definirAddress(address)
      Address(address)
      navigation.navigate("MapRotas")
    }
  }

  return <ImageBackground style={styles.containerPrincipal} source={image1}>
      <View style={styles.card}>
        <Text style={styles.tituloPrincipal}>Buscar Endereço</Text>
        <TextInput
        style={styles.textInput}
        value={address}
        onChangeText={address => definirAddress(address)}
        placeholder="Endereço"
        placeholderTextColor={"#fff"}
        />
        <Pressable style={styles.botao} onPress={SalvarAddress}>
          <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Buscar Rota</Text>
        </Pressable>
      </View>
    </ImageBackground>
}