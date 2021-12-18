
function toReais(input){
   return "R$ " + parseFloat(input).toFixed(2).replace(".", ",")
}

function consultaCep(cep){

   const API = "http://cep.la/"
   const CEP = cep.replace("-","");

   return new Promise((resolve, reject) => {

      fetch(API + CEP, {headers: {'Accept': 'application/json'}}).then(res => {
         if (res.status === 200) {
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

function zap(phone,text){

   const API = "https://api.whatsapp.com/send?"
   const PHONE = "phone="+phone
   const MSG = "&text=" + encodeURI((text || "Olá!"))

   window.location.href = API + PHONE + MSG

}

export {toReais, consultaCep, zap};