import { toReais } from "../scripts/utils.js"

/// LAYOUT

/// SUBPAGES
import Details from "../pages/details.js"


let name = "Checkout"


///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

div
  Details(v-model="details", :item="selectedItem", @close="removeNull")
  q-card.full-width(flat)
      
      q-card-section.row.items-center.q-pb-md
        q-btn.q-mr-md(@click="$router.push('/')" icon='eva-arrow-back-outline', flat='', round='', dense='', v-close-popup='')
        .text-h6 Cesta de Compras

      q-card-section.q-pt-none
        .row.full-width.full-height.q-mt-sm.q-mb-md
            .col
                .row.no-wrap.justify-center.q-mr-md(style="overflow-x:auto")
                    q-avatar.q-mt-sm.q-mr-sm(size='64px' v-for="item in Cart")
                        q-tooltip(anchor="top middle" self="bottom middle") {{toReais(item.value)}}
                        img(:src='item.product.imagem')
                        q-badge.text-dark(floating='', color='yellow-4') {{item.qty}}x

        //div(style='max-height: 300px; overflow-y: auto')
        div

          q-list.rounded-borders.full-width(bordered dense)
            // q-item-label(header) Meus Produtos
            div(v-for="item in displayableCart")
              q-item(clickable v-ripple @click="edit(item.reference)")
                // q-item-section(side top)
                  //q-checkbox()
                  //q-checkbox()
                  q-btn-group
                    q-btn(size="sm") -
                    q-btn(size="sm") +
                q-item-section(avatar)
                  q-avatar
                    img(:src='item.img')
                q-item-section
                  q-item-label(lines='1') 
                    strong {{item.qty}}x 
                    | {{item.val}}
                    
                  q-item-label(caption, lines='2')
                    span.text-weight-bold {{item.name}}
                    
                q-item-section(side, top)
                  | {{item.sum}}
              // q-separator(inset='item')
             

        //q-table(
          :data="Cart",
          :columns="columns",
          row-key="name",
          hide-header,
          hide-bottom,
          flat
          wrap-cells,
          :pagination="{rowsPerPage:0}"
          )

        
        

  q-footer.bg-grey-3.q-pt-md.q-pl-md.q-pr-md()
    
      q-card.full-width.q-pt-sm.q-pb-sm(flat)
            div.q-pl-lg.q-pr-lg
              q-table(
                hide-header,
                :columns="ColumnsPayment",
                :data="Payment",
                hide-bottom,
                flat
                dense
                wrap-cells
              )
      q-card-actions.text-teal(align='right')
        // q-btn(flat, label='Voltar', color="red")
        q-space
        q-btn.q-pl-md.q-pr-md(rounded label='Continuar', color="green-6", @click="$router.push('/client')")


`)({
  _TITLE:"main"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
      Details
    },
    
    mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////

    props: {
        value: Boolean,
    },

    data: () => ({

        details:false,
        selectedItem: {},

    }),
      
      ///////////// PROPERTIES AND DATA /////////////
      
      computed: {
        
      ...Vuex.mapState({ "Cart": state => state.cart }),
      ...Vuex.mapGetters(["summary"]),

      displayableCart(){

        return this.Cart.map(item=>({
            name: item.product.nome,
            img: item.product.imagem,
            val: item.product.valor,
            qty: item.qty,
            sum: toReais(item.value),
            reference: item
        }))

      },
      
      Payment(){
        return [
          { name: "Subtotal",         value: this.toReais(this.summary.subtotal)},
          { name: "Taxa de Entrega",  value: this.toReais(this.summary.deliveryfee)},
          { name: "Total",            value: this.toReais(this.summary.total)},
        ]
      }

    },

    watch: {
        value(val){
            this.$emit("input",val)
        }
    },
    
    methods: {

      toReais,

      edit(item){

        this.details=true;
        this.selectedItem = item;

      },

      removeNull(){

        console.log("removeNull")
        this.$store.commit("DELETE_ZERO_QTY");
        this.details =false

      }

    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    async mounted() {
      
    },


})

