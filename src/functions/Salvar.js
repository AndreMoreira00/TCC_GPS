import { setItemAsync } from "expo-secure-store";
import axios from "axios";

export async function SalvarConteudo(formulario) {
  return axios({
    method: "POST",
    url: "http://172.20.10.4:4000/endereco",
    data: {
      nome: formulario.nome,
      endereco: formulario.endereco,
    }
  }).catch(error => {
    console.log("batata ", error);
  });
}

export async function Address(endereco){
  await setItemAsync("endereco", JSON.stringify(endereco))
}