import { setItemAsync } from "expo-secure-store";
import axios from "axios";

export async function SalvarAddress(nome, endereco){
  await setItemAsync("consulta", JSON.stringify({
    nome,
    endereco
  }))
}

// export function SalvarConteudo(formulario) {
//   return axios({
//     method: "POST",
//     url: "http://localhost:4000/conteudo",
//     data: {
//       nome: formulario.nome,
//       endereco: formulario.endereco,
//     }
//   })
// }

export async function Address(endereco){
  await setItemAsync("endereco", JSON.stringify(endereco))
}