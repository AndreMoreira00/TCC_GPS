import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export async function CarregarEndereco(){
  return await getItemAsync("endereco")
}

export function ObterConteudo(){
  return axios({
    method: "GET",
    url: "http://172.20.10.4:4000/enderecos",
  })
}