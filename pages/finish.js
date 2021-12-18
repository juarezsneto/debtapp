import {zap} from "../scripts/utils.js"

/// SUBPAGES

let name = "Finish"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

q-dialog(v-model='value', persistent='', transition-show='scale', transition-hide='scale')
   q-card.bg-white
      q-card-section(style="text-align:center")
         q-spinner(v-if="loading" color="primary" size="3em")
         .text-h6(v-if="!error") {{ loading?'Enviando Pedido':'Pedido Enviado! =D' }}
         .text-h6(v-else) Ocorreu um Erro! =[
      q-card-section.q-mr-md.q-ml-md(style="text-align:center" v-if="!loading&&!error")
         p Seu pedido já foi solicitado ao estabelecimento!
         p Como todos os pedidos são feitos via WhatsApp
         p Recomendamos que avise o estabelecimento
         p Clicando no Botão OK
      q-card-section.q-mr-md.q-ml-md(style="text-align:center" v-if="!loading&&error")
         p Ocorreu um Erro ao tentar fazer o seu pedido
         p Por favor tente novamente
         

      q-card-actions.bg-teal.text-white(align='right' v-if="!loading")
         q-btn(v-if="!error" flat='' label='OK' icon="eva-message-circle-outline" @click="send()")
         q-btn(v-else flat='' label='REPETIR' @click="repeat()")


`)({
   _SENDING:"Enviando Pedido"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
    },
    
    mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////

    props: {
       value: Boolean,
    },

    data: () => ({
        
    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

       ...Vuex.mapState({
          "loading": state => state.application.loading,
          "error": state => state.application.error,
       }),

    },

    watch: {

      value(val){
         this.$emit("input", val)
         if(val) this.load();
      }

    },
    
    methods: {

      close(){
         this.$router.go(-1)
      },

      send(){

         const PHONE = "5548999401343"
         const MSG = `${this.$store.state.lastsent.cesta} \n\n Olá, acabei de fazer um pedido!`

         this.close();

         setTimeout(()=>{
            zap(PHONE,MSG)
         },500)

      },

      repeat(){
         this.$router.go(-1)
         setTimeout(()=>{
            
            window.location.reload();
         },500)
      }

    },

    ///////////// HOOKS ////////////////////////////
    
    async created() {


    },


})

