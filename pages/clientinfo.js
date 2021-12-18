// import { update } from "../scripts/db.js"
import { toReais, consultaCep, zap } from "../scripts/utils.js"

import Finish from "../pages/finish.js"

/// LAYOUT

let __this_reference = null;

/// SUBPAGES

let name = "ClientInfo"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

div

  Finish(v-model="finish")

  q-card.full-width(flat)

    q-card-section.row.items-center.q-pb-md
      q-btn.q-mr-md(@click="$router.go(-1)" icon='eva-arrow-back-outline', flat='', round='', dense='', v-close-popup='')
      .text-h6=_TITLE
    

    template
      .q-pa-md
        q-stepper(flat v-model='step', vertical='', color='primary', animated='', done-color="green-6")
          
          q-step(
            :name='1', 
            title='Onde deve ser feita a Entrega?', 
            icon='eva-pin-outline', 
            :done='step > 1', 
            @click="setStep(1)", 
            :caption="isWaiting?Client.address:'Onde suas compras devem ser entregues?'",
            :disable="isWaiting"
          )
            
            q-input(ref="address" v-model="Client.address" label="Informe seu Endereço Completo", @keyup.enter="step = 2", hint="Não esqueça de mencionar o número", :disable="isWaiting")


          q-step(
            :name='2', 
            title='Qual será a Forma de Pagamento?',
            icon='assignment',
            :done='step > 2', 
            @click="setStep(2)", 
            :caption="isWaiting?Client.payment:'Cartão ou Dinheiro?'",
            :disable="isWaiting"
          )
            q-select(
              ref="payment",
              :options="payments",
              v-model="Client.payment",
              :disable="isWaiting",
            )
            

          q-step(
            :name='3', 
            title='Como o Estabalecimento pode te Contactar?', 
            icon='eva-phone-call-outline', 
            :done='step > 3', 
            @click="setStep(3)", 
            :caption="isWaiting?Client.phone:'Caso dê algum problema com o seu pedido'",
            :disable="isWaiting"
          )
            
            q-input(ref="phone" v-model="Client.phone" label="Informe seu Telefone Celular", @keyup.enter="step = 3", mask="(##) ##### - ####" unmasked-value hint="Não esqueça o DDD",:disable="isWaiting")

          
          
          
          q-step(:name='4', title='Acompanhe seu Pedido', icon='assignment', @click="setStep(4)")
            
            q-badge.q-mr-xs(:outline='!status.atendido', :color="status.atendido?'green':'grey'", label='Recebido')
            q-badge.q-mr-xs(:outline='!status.encaminhado', :color="status.encaminhado?'orange':'grey'", label='A Caminho')
            q-badge.q-mr-xs(:outline='!status.entregue', :color="status.entregue?'blue':'grey'", label='Entregue')
            .text
              | Para que o estabelecimento possa te contactar caso haja algum problema, avise a ele sobre o seu pedido.
            q-stepper-navigation
              q-btn(@click="$router.push('/checkout')" size="sm", color="primary" outline, icon="eva-shopping-bag-outline") PEDIDO: {{orderCode}}
            



    q-footer()
      q-card-actions.bg-grey-3.text-teal(align='right')
        // q-btn(flat, label='Voltar', color="red")
        q-btn.q-pl-md.q-pr-md(v-if="step>3" @click="newOrder()" outline rounded label='Novo Pedido', color="grey-6" icon="eva-plus")
        q-space
        q-btn.q-pl-md.q-pr-md(v-if="step<3&&step>0" @click="next()" rounded label='Próximo Passo', color="primary" icon="eva-arrow-right")
        q-btn.q-pl-md.q-pr-md(v-if="step==3" @click="send()" rounded label='Finalizar Pedido', color="green-6")
        q-btn.q-pl-md.q-pr-md(v-if="step>3" @click="talk()" rounded label='Conversar', color="green-6" icon="eva-message-circle-outline")


`)({
  _TITLE:"Informações do Pedido"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
       Finish,
    },
    
    mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////

    props: {
        value: Boolean,
    },

    data: () => ({

      step:0,
      payments: ["Dinheiro", "Débito", "Crédito"],

      orderCode: 0,
      // finish: false,

      /* form:{
        phone:"",
        address:"",
        payment:"",
      }, */

      
       cepDebouncer: _.debounce(val=>{
          __this_reference.consultaCep(val)
       }, 1000)

    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

      ...Vuex.mapState({ 
        "Cart": state => state.cart,
        "Client": state => state.client,
        "isWaiting": state => state.isWaiting,
        "status": state => state.status,
      }),

      finish(){
        console.log("FINISH", this.$route.query.f)
        return this.$route.query.f&&true
      },

      /* orderCode(){
        // if(this.$store.state.lastsent)
        return this.$store.state.lastsent ; //_.get(this.$store.state, "lastsent.código", 0)
        // else return 0
      } */
      
      
    },
    
    watch: {
      
      /* "form.cep"(val){
        __this_reference = this;
        this.cepDebouncer(val);
      }, */
      
      step(val){

        setTimeout(()=>{
          switch(val){
            case 1: this.$refs.address.focus(); break;
            case 2: this.$refs.phone.focus(); break;
            case 3: this.$refs.payment.focus(); break;
          }
        },300)

      }
      

    },
    
    methods: {

      toReais,
      newOrder(){
        if(confirm("As informações do último pedido serão descartadas, mas seu pedido não será cancelado, qualquer dúvida entre em contato com o estabelecimento. Deseja continuar?")){
          // localStorage.clear();
          this.$store.dispatch("clear")
          this.$router.push("/");
          window.location.reload();
        }
      },

      setStep(x){
        if(this.isWaiting) this.step = 4;
        else this.step=x;
      },

      next(){
        this.setStep(this.step+1)
      },

      talk(){
        zap("5548999401343", "Olá! Sobre o meu pedido: "+this.$store.state.lastsent.código+" ... \n\n")
      },

      async send(){
        // this.finish=true;
        this.$router.push("?f=1");
        await this.$store.dispatch("packAndSend")
        this.orderCode = _.get(this.$store.state, "lastsent.código", 0);
        this.next();
      },

      /* async consultaCep(val){

         let addr = await consultaCep(val)
         console.log(addr)
         Vue.set(this.form, "cidade", addr.cidade)
         Vue.set(this.form, "addr", addr.logradouro)
      } */

    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    async mounted() {

      setTimeout(() => { 
        if(this.$store.state.isWaiting){
          this.$store.dispatch("ping")
          this.orderCode = _.get(this.$store.state, "lastsent.código",0);
          this.step = 4;
        }else
        this.step = 1;
      }, 500)
      //console.log("CEP", await consultaCep("88020303"))
      
      /* setInterval(() => { 
        if(this.step == 4){
          this.$store.dispatch("ping")
        }
      },60000) */


    },


})

