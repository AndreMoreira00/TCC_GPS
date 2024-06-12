import { getItemAsync } from "expo-secure-store";

export async function CarregarLista(){
  return await getItemAsync("consulta")
  
}

export async function CarregarEndereco(){
  return await getItemAsync("endereco")
}