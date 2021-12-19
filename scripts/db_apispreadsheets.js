import { toReais } from "../scripts/utils.js"

const API = "https://api.apispreadsheets.com/data/"
const KEY_PRODUTOS = "edDbic2MXNXVC9eb"
const KEY_PEDIDOS = "edDbic2MXNXVC9eb"
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
      
      _id: moment().format('YYMMDDHHmmssSS'),
      name: "Não identificado",
      description: "Sem Descrição",
      value: 0,
      date: new Date().getTime(),
      currency:0,
      pm: 5.6,
      conversion: 5600,
      parent: "",
      type: 1,
      ...packet,

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
