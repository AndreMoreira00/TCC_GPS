import { setItemAsync } from "expo-secure-store";

export async function SalvarAddress(nome, endereco){
  await setItemAsync("consulta", JSON.stringify({
    nome,
    endereco
  }))
}

export async function Address(endereco){
  await setItemAsync("endereco", JSON.stringify(endereco))
}