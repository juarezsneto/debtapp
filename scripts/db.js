import { toReais } from "../scripts/utils.js"

const API = "https://api.apispreadsheets.com/data/"
const KEY_PRODUTOS = 955
const KEY_PEDIDOS = 948
const LINK_PRODUTOS = API + KEY_PRODUTOS + "/"
const LINK_PEDIDOS = API + KEY_PEDIDOS + "/"

function update(){
   
   return new Promise((resolve,reject)=>{

      fetch(LINK_PRODUTOS).then(res => {
         if (res.status === 200) {
            // SUCCESS
            res.json().then(data => {
               resolve(data.data)
            }).catch(err => console.log(err))
         }
         else {
            reject();
         }
      })

   })

}

function post(packet){

   
   const toSheet = {
      
      código: moment().format('YYMMDDHHmmssSS'),
      cliente: "Anônimo",
      contato: packet.client.phone,
      endereço: packet.client.address,
      pagamento: packet.client.payment,
      cesta: packet.cart.map(
         item=>{
            return item.qty+"x - "+toReais(item.value)+" - "+item.product.nome
         }
      ).join("\n"),
      subtotal: toReais(packet.summary.subtotal),
      entrega: toReais(packet.summary.deliveryfee),
      total: toReais(packet.summary.total),

   }


   return new Promise((resolve, reject) => {

      fetch(LINK_PEDIDOS, {
         method: "POST",
         body: JSON.stringify({data: toSheet}),
      }).then(res => {
         if (res.status === 201) {
            resolve(toSheet)
         }
         else {
            reject(res);
         }
      })

   })



}

function ping(orderCode) {

   const query = "?query=selectatendido,encaminhado,entreguefrom948wherecódigo='"+orderCode+"'"

   return new Promise((resolve, reject) => {

      fetch(LINK_PEDIDOS+query).then(res => {
         if (res.status === 200) {
            // SUCCESS
            res.json().then(data => {
               resolve(data.data)
            }).catch(err => console.log(err))
         }
         else {
            reject();
         }
      })

   })

}




export {update, post, ping};