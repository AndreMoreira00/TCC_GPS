import React, {useState, useEffect} from "react";
import {ScrollView, View, Text, TextInput, Pressable, RefreshControl, ImageBackground} from "react-native";
import {Address, SalvarConteudo} from "../functions/Salvar";
import {ObterConteudo} from "../functions/Carregar";
import styles from "../styles/Salvos";
import { useNavigation } from "@react-navigation/native";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import { Lista } from "../components/Lista";

export default function Salvos(){
    // Novo estado para carregar o conteudo
    const [conteudo, definirConteudo] = useState({})
    // Navegar para o caminho do mapa 
    const navigation = useNavigation();
    // Estado para preencher o formulario
    const [formulario, definirFormulario] = useState({
        nome:"",
        endereco:"",
    })
    const [refreshing, setRefreshing] = useState(false);
    

    // Modelo para carregar o conteudo salvo pelo formulario
    useEffect(function(){
        ObterConteudo().then(function(resposta){
          if(resposta.status == 200){
            definirConteudo(resposta.data)
            // console.log(resposta.data)
          }else{
            console.log(resposta);
          } 
        }).catch(function(erro){
          console.log(erro);
        })
    }, [])
    
    // Salvar Formulario 
    function SalvarFormulario(){
        SalvarConteudo(formulario)
        .then(function(resposta){
            if (resposta.novoConteudo === 201) return alert("Conteudo enviado com sucesso!")
            else
             return console.log(resposta)
          })
          .catch(function(erro){
            return console.log(erro)
          })
        definirFormulario({nome:"", endereco:""})
    }

      // Recarregar tela 
      const handleRefresh = () => {
        setRefreshing(true);
        ObterConteudo().then(function(resposta){
          if(resposta.status == 200){
            definirConteudo(resposta.data)
            setRefreshing(false)
          }else{
            console.log(resposta);
          } 
        }).catch(function(erro){
          console.log(erro);
          setRefreshing(false);
        })
      };
    
    return (
      <ImageBackground source={image1} style={styles.containerPrincipal}>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={"#C356FC"}
            progressBackgroundColor={"#fff"}
            onRefresh={() => handleRefresh()}
          />
        }
        >
          <View style={styles.card}>
            {/* Carregar Formulario */}
            <View style={styles.containerFormulario}>

                <Text style={styles.tituloPrincipal}>Salvar nova Rota</Text>

                <View>

                    <Text style={styles.tituloTerciario}>Formulario Endereco</Text>

                    <TextInput
                    value={formulario.nome}
                    onChangeText={valor => definirFormulario({...formulario, nome:valor})}
                    placeholder="Titulo"
                    placeholderTextColor={"#fff"}
                    style={styles.textInput}/>

                    <TextInput
                    value={formulario.endereco}
                    onChangeText={valor => definirFormulario({...formulario, endereco:valor})}
                    placeholder="Endereco"
                    placeholderTextColor={"#fff"}
                    style={styles.textInput}/>

                    <Pressable style={styles.botao} onPress={SalvarFormulario}>
                        <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Enviar</Text>
                    </Pressable> 
                </View>   
            </View>

            {/* Carregar Lista */}
            <Text style={styles.tituloPrincipal}>Rotas Salvas</Text>
            {
                Object.keys(conteudo).length > 0 && <View style={styles.containerConteudos}>
                    <Lista conteudos={conteudo}/>
                </View>
            }
          </View>
        </ScrollView>
      </ImageBackground>
    );
}