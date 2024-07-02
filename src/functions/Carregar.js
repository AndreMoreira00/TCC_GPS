import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export async function CarregarEndereco(){
  return await getItemAsync("endereco")
}

export async function CarregarID(){
  return await getItemAsync("id")
}


export function ObterConteudo(){
  return axios({
    method: "GET",
    url: "http://192.168.0.55:4000/enderecos",
  })
}