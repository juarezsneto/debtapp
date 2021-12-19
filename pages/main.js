

/// LAYOUT
import FooterCheckout from "../components/FooterCheckout.js"


import ItemList from "../components/ItemList.js"

import Details from "../pages/details.js"

/// SUBPAGES

let name = "Home"


///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`


.row.full-height


  .col.flex.column

    //.full-width
        q-carousel(animated='', v-model='slide', navigation='', infinite='', autoplay, arrows='', transition-prev='slide-right', transition-next='slide-left', @mouseenter='autoplay = false', @mouseleave='autoplay = true')
            q-carousel-slide(:name='1', img-src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80')
            // q-carousel-slide(:name='2', img-src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
            // q-carousel-slide(:name='3', img-src='https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80')
            // q-carousel-slide(:name='4', img-src='https://images.unsplash.com/photo-1551797802-f2dd1ec0033e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')
        

    .full-width.q-pa-lg
        
        q-input(filled='', v-model='search', placeholder="Busque o que você precisa")
            template(v-slot:prepend='')
                q-icon(name='eva-search-outline')



    div.full-width(style="overflow-x:auto")
        ItemList(v-model="filteredCategory", @add="addItem", descriptionfield="value")
        
    FooterCheckout
        .row.full-width.full-height
            .full-height.column.justify-center.items-center
                q-btn(v-if="step==0" flat unelevated color="grey-6" icon="eva-menu-outline")
                    q-menu(auto-close)
                        q-list
                            q-item(v-for="item in categories" clickable @click="setCategory(item)")
                                q-item-section {{item}}
                q-btn(v-else flat unelevated color="grey-6" icon="eva-arrow-left" @click="prevStep()")
            .col.full-height.column.justify-center.q-pl-md.q-pr-md
                .row.no-wrap.q-mr-md(style="overflow-x:auto")
                    q-tab-panels.full-width(v-model="currentStep", animated)
                        q-tab-panel.q-pa-xs.bg-grey-3.clickable(name="idle" clickable)
                            .text-h5.text-green-3 $ {{currentSummary}}
                            .text-subtitle2.text-grey-6 {{currentCategory}}
                        q-tab-panel.q-pa-xs.bg-grey-3(name="price")
                            q-input.full-width(ref="inputprice" dense, v-model='price', placeholder="Insira o Valor", @focus="onFocus($event)", mask="#.##", fill-mask="0", reverse-fill-mask, input-class="text-right", label="Valor")
                                template(v-slot:prepend='')
                                    q-icon(v-if="!signal" name='eva-plus-outline', color="green", @click="invert()")
                                    q-icon(v-else name='eva-minus-outline', color="red", @click="invert()")
                        q-tab-panel.q-pa-xs.bg-grey-3(name="description")
                            q-input.full-width(ref="inputdescription", dense, v-model='name', placeholder="Digite uma Descrição", label="Descrição")
            
            .full-height.column.justify-center.items-center
                //q-btn(v-if="isWaiting" unelevated rounded color="primary" icon="eva-car-outline" @click="gotoTrack()") Acompanhar meu pedido
                //q-btn(v-else unelevated rounded color="positive" icon="eva-checkmark-circle-outline" @click="gotoCheckout()", :disable="cartEmpty") {{totalSum}}
                //q-btn(rounded unelevated color="primary" icon="eva-arrow-right-outline" @click="nextStep()")
                q-btn(rounded unelevated color="positive" icon="eva-arrow-right-outline" @click="nextStep()")
    


`)({
  _TITLE:"main"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
        ItemList,
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

        step: 0,
        steps: ["idle","price","description", "done"],

        signal: 0,
        price: 0,
        name: "",

        currentCategory:"",
        
    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

        ...Vuex.mapState({ "Cart": state => state.cart }),
        ...Vuex.mapState({ "productList": state => state.productList }),
        ...Vuex.mapState({ "isWaiting": state => state.isWaiting }),
        ...Vuex.mapGetters(["shelves", "categories", "summary"]),

        totalSum(){

            return this.toReais(this.summary.subtotal)

        },

        cartEmpty(){
            return this.Cart.length < 1
        },

        filteredCategory(){
            return this.productList.filter((el)=>el.parent==this.currentCategory)
        },

        currentSummary(){
            return _.sumBy(this.filteredCategory, "value").toFixed(2)
        },

        filteredShelves(){

            let newShelf = {};

            for(let key of Object.keys(this.shelves)){
                newShelf[key] = this.shelves[key].filter(el=> this.search=='' || el.nome.toLowerCase().search(this.search.toLowerCase())!=-1 )
            }

            console.log("newShelf", newShelf)
            return newShelf;

        },

        currentStep(){
            return this.steps[this.step];
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
        },

        nextStep(incr=1){

            console.log(this.shelves)
            this.step += incr
            console.log(this.step, this.currentStep)

            if(this.step==1){
                setTimeout(()=>{this.$refs.inputprice.focus()},200)
            }

            if(this.step==2){
                setTimeout(()=>{this.$refs.inputdescription.focus()},200)
            }

            else if(this.step>=3){
                this.step=0;
                this.addTransaction();
                this.price = 0;
                this.signal = 0;
                this.name = "";
            }
        },

        async addTransaction(){
            await this.$store.dispatch("packAndSend",{name: this.name, value: this.price * (-1*this.signal), parent: this.currentCategory})
            this.$store.dispatch("init")
        },

        prevStep(){
            this.nextStep(-1);
        },

        onFocus(event) {
            console.log("FOCUS",event)
            setTimeout(()=>{
                event.target.select();
            },100)
        },

        setCategory(category){
            this.currentCategory = category;
            console.log(this.currentCategory)
        },


        invert(){
            this.signal = !this.signal;
        }

    },

    ///////////// HOOKS ////////////////////////////
    
    async created() {

    },


})

