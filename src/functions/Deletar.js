import axios from "axios";

export async function DeletarItem(formulario){
  return axios({
    method: "DELETE",
    url: "http://192.168.0.55:4000/enderecos/:id",
    data: { id: formulario }
  }).catch(error => {
    console.log(error)
  })
}