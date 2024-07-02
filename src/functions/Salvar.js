import { setItemAsync } from "expo-secure-store";
import axios from "axios";

export async function SalvarConteudo(formulario) {
  return axios({
    method: "POST",
    url: "http://192.168.0.55:4000/endereco",
    data: {
      nome: formulario.nome,
      endereco: formulario.endereco,
    }
  }).catch(error => {
    console.log(error);
  });
}

export async function Address(endereco){
  await setItemAsync("endereco", JSON.stringify(endereco))
}

export async function ID(id){
  await setItemAsync("id", JSON.stringify(id))
  // console.log("cache: ", id)
}

export async function AlterarNome(formulario) {
  return axios({
    method: "PUT",
    url: "http://192.168.0.55:4000/enderecos/:nome",
    data: {
      id: formulario.id,
      nome: formulario.nome,
      endereco: formulario.endereco,
    }
  }).catch(error => {
    console.log(error);
  });
}