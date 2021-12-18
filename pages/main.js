

/// LAYOUT
import FooterCheckout from "../components/FooterCheckout.js"


import ItemCard from "../components/ItemCard.js"

import Details from "../pages/details.js"

/// SUBPAGES

let name = "Home"


///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`


.row.full-height


  .col.flex.column

    .full-width
        q-carousel(animated='', v-model='slide', navigation='', infinite='', autoplay, arrows='', transition-prev='slide-right', transition-next='slide-left', @mouseenter='autoplay = false', @mouseleave='autoplay = true')
            q-carousel-slide(:name='1', img-src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80')
            // q-carousel-slide(:name='2', img-src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
            // q-carousel-slide(:name='3', img-src='https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80')
            // q-carousel-slide(:name='4', img-src='https://images.unsplash.com/photo-1551797802-f2dd1ec0033e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')
        

    .full-width.q-pa-lg
        
        q-input(filled='', v-model='search', placeholder="Busque o que você precisa")
            template(v-slot:prepend='')
                q-icon(name='eva-search-outline')


    div.full-width.q-mb-lg(v-for="(shelf, idx) in filteredShelves")
        
        div(v-show="shelf.length>0")
            q-separator.q-mt-lg
            q-item-label.text-h5(header) {{idx}}
        

        div.full-width(style="overflow-x:auto")
            .row.no-wrap.q-mr-md
                div.q-ml-md.q-mr-md(v-for="product in shelf")
                    ItemCard(v-model="product", @add="addItem")
        
    FooterCheckout
        .row.full-width.full-height
            .col
                .row.no-wrap.q-mr-md(style="overflow-x:auto")
                    q-avatar.q-mt-sm.q-mr-sm(size='40px' v-for="(item, idx) in Cart" @click="subItem(item, idx)")
                        //q-tooltip(anchor="top middle" self="bottom middle") {{toReais(item.value)}}
                        img(:src='item.product.imagem')
                        q-badge.text-dark(floating='', color='yellow-4') {{item.qty}}x
            
            .full-height.column.justify-center.items-center
                q-btn(v-if="isWaiting" unelevated rounded color="primary" icon="eva-car-outline" @click="gotoTrack()") Acompanhar meu pedido
                q-btn(v-else unelevated rounded color="positive" icon="eva-checkmark-circle-outline" @click="gotoCheckout()", :disable="cartEmpty") {{totalSum}}
    


`)({
  _TITLE:"main"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
        ItemCard,
        Details,
    },
    
    mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////

    props: {},

    data: () => ({
        
        slide: 1,

        search: "",
        
        checkout: true,

        details:true,
        
    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

        ...Vuex.mapState({ "Cart": state => state.cart }),
        ...Vuex.mapState({ "productList": state => state.productList }),
        ...Vuex.mapState({ "isWaiting": state => state.isWaiting }),
        ...Vuex.mapGetters(["shelves", "summary"]),

        totalSum(){

            return this.toReais(this.summary.subtotal)

        },

        cartEmpty(){
            return this.Cart.length < 1
        },

        filteredShelves(){

            let newShelf = {};

            for(let key of Object.keys(this.shelves)){
                newShelf[key] = this.shelves[key].filter(el=> this.search=='' || el.nome.toLowerCase().search(this.search.toLowerCase())!=-1 )
            }

            console.log("newShelf", newShelf)
            return newShelf;

        }

    },

    watch: {

    },
    
    methods: {

        addItem(product){
            
            this.$store.commit("ADD_ITEM", product)

        },

        subItem(item, idx) {

            this.$store.commit("SUB_ITEM", {item,idx})

        },
        
        toReais(input){
            return "R$ "+parseFloat(input).toFixed(2).replace(".",",")
        },

        gotoCheckout(){
            this.$router.push("/checkout")
        },

        gotoTrack(){
            this.$router.push("/client")
        }


    },

    ///////////// HOOKS ////////////////////////////
    
    async created() {

    },


})

