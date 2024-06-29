import React, {useState, useEffect} from "react";
import { View, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Salvos";
import { Address } from "../functions/Salvar";

export function Lista(props){
  const navigation = useNavigation();
  // const [endereco, definirEndereco] = useState();

  function SalvarRota(endereco){
    Address(endereco)
    navigation.navigate("MapRotas")
  }
  // console.log(props)
  return <View>
      {
        props.conteudos.map(function(conteudo){
          if (conteudo.name === props.name)
            // definirEndereco(conteudo.endereco)
            return <View style={styles.containerDado}>
                <Pressable onPress={() => SalvarRota(conteudo.endereco)}>
                  <Text style={styles.tituloTerciario}>{conteudo.nome}</Text>
                  <Text style={styles.text}>{conteudo.endereco}</Text>
                </Pressable>
              </View> 
        })
      }
  </View>
}
