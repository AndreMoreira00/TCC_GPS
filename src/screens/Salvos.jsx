import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Pressable, RefreshControl, ImageBackground, ScrollView, FlatList, Modal} from "react-native";
import {Address, ID, SalvarConteudo, AlterarNome} from "../functions/Salvar";
import {ObterConteudo, CarregarID} from "../functions/Carregar";
import styles from "../styles/Salvos";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import image1 from "../assets/image1.jpg";

export default function Salvos(){
    // Formulario editado
    const [formularioEditar, definirFormularioEditado] = useState({
      id: "",
      nome:"",
      endereco: "",
    })
    // Modal
    const [modalVisible, setModalVisible] = useState(false);
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
    
    useFocusEffect(React.useCallback(() => {
      CarregarID().then(function(dados){
        const key = JSON.parse(dados || "{}")
        definirFormularioEditado({...formularioEditar, id: key})
      })
      }, [])
    )

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
        // Resetar formulario
        definirFormularioEditado({
          id: "",
          nome:"",
          endereco: "",
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

    function PressID(id){
      // console.log("Salvar: ", id)
      ID(id)
      setModalVisible(true)
      // navigation.navigate('Editar')
    }

    function SalvarRota(endereco){
      Address(endereco)
      navigation.navigate("MapRotas")
    }
    
    const Lista = ({item}) =>(
      <View style={styles.containerDado}>
        <Pressable onPress={() => SalvarRota(item.endereco)}>
          <Text style={styles.tituloTerciario}>{item.nome}</Text>
          <Text style={styles.text}>{item.endereco}</Text>
        </Pressable>
        <Pressable style={styles.botao} onPress={() => PressID(item._id)}>
          <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Editar</Text>
        </Pressable>
      </View>
    );

    function press(){
      AlterarNome(formularioEditar)
      setModalVisible(!modalVisible)
      definirFormularioEditado({
        id: "",
        nome:"",
        endereco: "",
      })
    }
    function voltar(){
      setModalVisible(!modalVisible)
      definirFormularioEditado({
        id: "",
        nome:"",
        endereco: "",
      })
    }


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
                    style={styles.textInput}
                    minLength={1}/>

                    <TextInput
                    value={formulario.endereco}
                    onChangeText={valor => definirFormulario({...formulario, endereco:valor})}
                    placeholder="Endereco"
                    placeholderTextColor={"#fff"}
                    style={styles.textInput}
                    minLength={4}/>

                    <Pressable style={styles.botao} onPress={SalvarFormulario}>
                        <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Enviar</Text>
                    </Pressable> 
                </View>   
            </View>

            {/* Carregar Lista */}
            <Text style={styles.tituloPrincipal}>Rotas Salvas</Text>
            {
                Object.keys(conteudo).length > 0 && <View style={styles.containerConteudos}>
                    <FlatList
                    data={conteudo}
                    initialNumToRender={3}
                    renderItem={({item})=> <Lista item={item}/>}
                    keyExtractor={(item) => item._id}/>
                </View>
            }
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
                <ImageBackground source={image1} style={styles.containerPrincipal}>
                  <View style={styles.containerFormulario}>
                    <View style={styles.card}>
                      {/* Carregar Formulario */}
                      <Text style={styles.tituloPrincipal}>Editar Endereço</Text>
                      <View>
                          <TextInput
                          value={formularioEditar.nome}
                          onChangeText={valor => definirFormularioEditado({...formularioEditar, nome:valor})}
                          placeholder="Titulo"
                          placeholderTextColor={"#fff"}
                          style={styles.textInput}
                          minLength={1}
                          />

                          <TextInput
                          value={formularioEditar.endereco}
                          onChangeText={valor => definirFormularioEditado({...formularioEditar, endereco:valor})}
                          placeholder="Endereço"
                          placeholderTextColor={"#fff"}
                          minLength={5}
                          style={styles.textInput}/>

                          <Pressable style={styles.botao} onPress={press}>
                              <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Enviar</Text>
                          </Pressable> 
                          
                      </View>   
                    </View>
                    <Pressable style={styles.botao} onPress={voltar}>
                        <Text style={{color: "#fff", fontSize:15, fontWeight:"bold"}}>Voltar</Text>
                    </Pressable>
                  </View>
                </ImageBackground>
              </Modal>
          </View>
        </ScrollView>
      </ImageBackground>
    );
}