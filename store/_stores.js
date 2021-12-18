/// DEPENDENCIES ////////////////////////////////////////////////////////////
// import Service from "./service.js"
import { update, post, ping } from "../scripts/db_apispreadsheets.js"
import Memory from "../scripts/local.js"

/// MAIN STORE SETUP /////////////////////////////////////////////////////////
export default new Vuex.Store({
  
  state:{

   isWaiting: false,
   lastUpdate: 0,

   productList: [],
   
   cart: [],

   status:{
      atendido: false,
      encaminhado: false,
      entregue: false,
   },

   client: {
      address:"",
      phone:"",
      payment:"Dinheiro",
   },

   deliveryfee: 4.5,
   application:{
      loading: false,
      error: false,
   }

  },

  mutations:{

   ADD_ITEM(state,product){

      if(state.isWaiting) return
      
      let similar = state.cart.find(item => item.product.nome == product.nome)

      let item = { product, qty: 1, value: parseFloat(product.valor.replace(",", ".")) }

      if (similar) {
         similar.qty += 1;
         similar.value += parseFloat(product.valor.replace(",", "."));
         console.log(similar.qty, similar.value)
      } else {
         state.cart.push(item)
      }

   },

   SUB_ITEM(state, {item,idx}) {

      if (state.isWaiting) return

      // let itemRef = state.cart[idx];

      item.qty -= 1;
      item.value -= parseFloat(item.product.valor.replace(",", "."));
      
      if(item.qty<1){
         state.cart.splice(idx,1)
      }

   },

   DELETE_ZERO_QTY(state){

      for (let i = state.cart.length; i>0; i--){

         if(state.cart[i-1].qty==0) state.cart.splice(i-1,1);

      }

   },

   UPDATE_PRODUCTS(state, list){
      state.productList = list;
      state.lastUpdate = new Date().getTime();
   }

  },

  actions:{

      async packAndSend({state, getters, dispatch}){

         state.application.loading = true;

         const packet = {
            cart: state.cart,
            client: state.client,
            summary: getters.summary,
         }

         try{
            state.lastsent = await post(packet);
            state.isWaiting = true;
            dispatch("sync")
         } catch(e){
            console.warn(e);
            this.state.application.error = true;
         } finally {
            state.application.loading = false;
         }


      },

      async init({state, commit, dispatch}){

            const local = Memory.getLocally();

            if(local != undefined) Object.assign(state,local);

            console.log("lOCAL", local.productList)
            // } else {
            if (new Date().getTime() > ( (state.lastUpdate||0) + (1000*60*30)) || local==undefined){
               console.log("UDPATE_PRODUCTS")
               commit("UPDATE_PRODUCTS", await update("produtos"));
               dispatch("sync")
            }
            // }

            /* for(let key of Object.keys(local)){
               console.log(key)
               state[key] = local[key]
            } */
            
            // console.log(local)

            // state.isWaiting = local.isWaiting;
            // state = Memory.getLocally();

            
      },
         
      async ping({state}){
         
         let status = await ping(state.lastsent.código);

         Object.assign(state.status, status[0])

         console.log(state.status, status[0])

      },

      async sync({getters}){
         Memory.saveLocally(getters.snapshot);
      },

      async clear({ getters }) {
         Memory.cleanCache({
            isWaiting: undefined,
            // productList: undefined,
            cart: undefined,
         });
      },


  },

  getters:{

      shelves(state){
         return _.groupBy(_.orderBy(state.productList, 'prioridade'), "categoria")
      },

      summary(state){

         const subtotal = state.cart.reduce((acc, item) => { acc += item.value; return acc; }, 0);

         return {
            subtotal,
            deliveryfee: state.deliveryfee,
            total: subtotal+state.deliveryfee,
         }

      },

      snapshot(state){
         return {...state, application: undefined}
      }

  },

  modules:{
  }
  
});
