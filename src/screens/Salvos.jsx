import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Pressable} from "react-native";
import {Address, SalvarConteudo} from "../functions/Salvar";
import {CarregarLista, ObterConteudo} from "../functions/Carregar";
import styles from "../styles/Salvos";
import { useNavigation } from "@react-navigation/native";


export default function Salvos(){
    // Novo estado para carregar o conteudo do formulario
    // const [conteudo, definirConteudo] = useState({})
    // Navegar para o caminho do mapa 
    const navigation = useNavigation();
    // Estado para preencher o formulario
    const [formulario, definirFormulario] = useState({
        nome:"",
        endereco:"",
    })
    // Antigo carregador de conteudo
    const [resultados, definirResultado] = useState({})

    // Antigo estado para carregar o conteudo do formulario salvo
    useEffect(function(){
        CarregarLista().then(function(dados){
        const valido = JSON.parse(dados || "{}")
        definirResultado(valido)
        })
        .catch(function(erro){
        alert(erro)
        })
    },[formulario])

    // Novo modelo para carregar o conteudo salvo pelo formulario
    // useEffect(function(){
    //     ObterConteudo().then(function(resposta){
    //       if(resposta.status == 200){
    //         definirConteudo(resposta.data)
    //       }else{
    //         console.log(resposta);
    //       } 
    //     }).catch(function(erro){
    //       console.log(erro);
    //     })
    //   },[])
    
    // Salvar Formulario Novo/Antigo
    function SalvarFormulario(){
        // SalvarAddress(formulario.nome, formulario.endereco)
        SalvarConteudo(formulario)
        .then(function(resposta){
            if (resposta.status === 201) return alert("Conteudo enviado com sucesso!")
            else
             return console.log(resposta)
          })
          .catch(function(erro){
            return console.log(erro)
          })
        definirFormulario({nome:"", endereco:""})
    }
    
    // Salvar e mandar o endereço para o mapa de rota
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