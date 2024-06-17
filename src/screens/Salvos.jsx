import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Pressable} from "react-native";
import {SalvarAddress, Address} from "../functions/Salvar";
import {CarregarLista} from "../functions/Carregar";
import styles from "../styles/Salvos";
import { useNavigation } from "@react-navigation/native";
// import SalvarConteudo from "../functions/Salvar";

export default function Salvos(){

    const navigation = useNavigation();

    const [formulario, definirFormulario] = useState({
        nome:"",
        endereco:"",
    })

    const [resultados, definirResultado] = useState({})

    useEffect(function(){
        CarregarLista().then(function(dados){
        const valido = JSON.parse(dados || "{}")
        definirResultado(valido)
        })
        .catch(function(erro){
        alert(erro)
        })
    },[formulario])
    
    function SalvarFormulario(){
        // SalvarConteudo(formulario)
        SalvarAddress(formulario.nome, formulario.endereco)
        // Address(formulario.endereco)
        definirFormulario({nome:"", endereco:""})
        alert("Salvo com sucesso!")
    }
    
    function SalvarRota(){
        Address(resultados.endereco)
        navigation.navigate("MapRotas")
        // alert("Buscando Rota")
    }
    
    return (
        <View style={styles.containerPrincipal}>
            {
            Object.keys(resultados).length > 0 && <View style={styles.containerRotas}>

                <Text style={styles.tituloPrincipal}>Rotas Salvas</Text>

                <View>
                    <Text style={styles.tituloTerciario}>{resultados.nome}</Text>
                    <Text>{resultados.endereco}</Text>
                    <Pressable style={styles.botao} onPress={SalvarRota}>
                        <Text>Buscar Rota</Text>
                    </Pressable>
                </View>

            </View>
            }

            <View style={styles.containerFormulario}>

                <Text style={styles.tituloPrincipal}>Salvar nova Rota</Text>

                <View>

                    <Text style={styles.tituloTerciario}>Formulario Endereco</Text>

                    <TextInput
                    value={formulario.nome}
                    onChangeText={valor => definirFormulario({...formulario, nome:valor})}
                    placeholder="Titulo"
                    style={styles.textInput}/>

                    <TextInput
                    value={formulario.endereco}
                    onChangeText={valor => definirFormulario({...formulario, endereco:valor})}
                    placeholder="Endereco"
                    style={styles.textInput}/>

                    <Pressable style={styles.botao} onPress={SalvarFormulario}>
                        <Text>Enviar</Text>
                    </Pressable> 

                </View>   
            </View>
        </View>
    );
}