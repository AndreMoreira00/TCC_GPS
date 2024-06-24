import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export async function CarregarLista(){
  return await getItemAsync("consulta")
}

export async function CarregarEndereco(){
  return await getItemAsync("endereco")
}

export function ObterConteudo(){
  return axios({
    method: "GET",
    url: "http://localhost:4000/enderecos",
  })
}