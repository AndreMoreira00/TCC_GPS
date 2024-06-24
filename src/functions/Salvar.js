import { setItemAsync } from "expo-secure-store";
import axios from "axios";

// export async function SalvarAddress(nome, endereco){
//   await setItemAsync("consulta", JSON.stringify({
//     nome,
//     endereco
//   }))
// }

export async function SalvarConteudo(formulario) {
  return axios({
    method: "POST",
    url: "http://192.168.15.3:4000/endereco",
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