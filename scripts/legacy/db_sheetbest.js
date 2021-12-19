import { toReais } from "../scripts/utils.js"

const API = "https://sheet.best/api/sheets/"
const KEY = "77ec5a2d-875a-42d8-aa51-36272a022813"
const LINK_PRODUTOS = API + KEY + "/tabs/produtos"
const LINK_PEDIDOS = API + KEY + "/tabs/pedidos"

function update(){
   
   return new Promise((resolve,reject)=>{

      fetch(LINK_PRODUTOS).then(res => {
         if (res.status === 200) {
            // SUCCESS
            res.json().then(data => {
               resolve(data)
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
         body: JSON.stringify(toSheet),
         headers:{"Content-Type": "application/json"},
      }).then(res => {
         if (res.status === 200) {
            resolve(toSheet)
         }
         else {
            reject(res);
         }
      })

   })



}

function ping(orderCode) {

   const query = "/código/"+orderCode

   return new Promise((resolve, reject) => {

      fetch(LINK_PEDIDOS+query).then(res => {
         if (res.status === 200) {
            // SUCCESS
            res.json().then(data => {
               resolve(data)
            }).catch(err => console.log(err))
         }
         else {
            reject();
         }
      })

   })

}




export {update, post, ping};