import {View, Text, TextInput, Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import { Address } from "../functions/Salvar";
import styles from "../styles/Salvos";
import { useNavigation } from "@react-navigation/native";


export default function Home(){
  
  const navigation = useNavigation();

  const [address, definirAddress] = useState('')

  async function SalvarAddress(){
    definirAddress(address)
    Address(address)
    navigation.navigate("MapRotas")
    // alert("Buscando Rota")
  }

  return <View style={styles.containerPrincipal}>
    <View>
      <Text style={styles.tituloTerciario}>Buscar Rota</Text>
      <TextInput
      style={styles.textInput}
      value={address}
      onChangeText={address => definirAddress(address)}
      placeholder="Endereço"/>

      <Pressable style={styles.botao} onPress={SalvarAddress}>

        <Text>Buscar Rota</Text>

      </Pressable>
    </View>
  </View>
}