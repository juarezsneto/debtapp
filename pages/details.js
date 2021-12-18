import {zap} from "../scripts/utils.js"

/// SUBPAGES

let name = "Details"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

q-dialog(v-model='value', persistent='', transition-show='scale', transition-hide='scale')
   q-card.bg-white
      q-card-section(style="text-align:center")
         .text-h6 {{getNome}}
         q-avatar.q-mt-sm.q-mr-sm(square size='240px')
            img(:src='getImg')
            // q-badge.text-dark(floating='', color='yellow-4') {{'1'}}x

      q-card-section.q-mr-md.q-ml-md(style="text-align:center" v-if="!loading")
         
      q-card-actions.bg-teal.text-white(align='right' v-if="!loading")
         q-btn-group(outline='' rounded)
            q-btn(outline='', color='white', icon-right='eva-minus-outline' @click="sub()", :disabled="isWaiting")
            q-btn.q-pl-md.q-pr-md(text-color="teal", color='white' disable) {{current.qty}}
            q-btn(outline='', color='white', icon-right='eva-plus-outline' @click="add()", :disabled="isWaiting")
         
         q-space
         q-btn(flat='' label='OK' @click="close()")


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
       item: {type:Object, default: {}}
    },

    data: () => ({
        
    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

       ...Vuex.mapState({
          "loading": state => state.application.loading,
          "isWaiting": state => state.isWaiting,
       }),

      current(){
       return this.item
      },

      getNome(){
         return _.get(this.current, "product.nome", "")
      },

      getImg() {
         return _.get(this.current, "product.imagem", "")
      }

    },

    watch: {

      value(val){
         this.$emit("input", val)
         // if(val) this.load();
      }

    },
    
    methods: {

      sub(){
          if(this.item.qty>0){
            this.item.qty--;
            this.item.value -= parseFloat(this.item.product.valor.replace(",", "."));
          }
      },
      
      add(){
         this.item.qty++;
         this.item.value += parseFloat(this.item.product.valor.replace(",", "."));
      },

      close(){
         // this.$router.go(-1)
         this.value = false
         this.$emit("close");
      },


    },

    ///////////// HOOKS ////////////////////////////
    
    async created() {


    },


})

