const name = "ItemCard"

const purpose= "Wrapper for Autocomplete Online Search"

///////////////////////////////////////////// COMPONENT STRUCTURE

const template = jade.compile(`


q-card.my-card(flat)
   q-img.picture(:src='value.imagem' contain)
   q-card.q-pa-sm.etiqueta(flat)
      q-card-section.q-pa-none
         // q-btn.absolute(size="sm", round, dense, color='red-5', icon='eva-minus-outline', style='top: 0; right: 0px; transform: translateY(-200%) translateX(50%);')
         q-btn.absolute(size="md", round, dense, color='grey-5', icon='eva-plus-outline', style='top: 0; right: 0px; transform: translateY(-50%) translateX(50%);' @click="add()")
         .row.no-wrap.items-center
            .col.nome
               | {{value.nome}}
            //.col-auto.text-grey.text-caption.q-pt-md.row.no-wrap.items-center
               q-icon(name='place')
               | 250 ft
      q-card-section.row.q-pa-none
         span.col-grow |||||||||||
         .rs.q-mr-xs R$
         .valor {{value.valor}}
         
`)({
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
   template,
   components: {},
    
   mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////
    
   props: {
 
      value:{
         type: Object,
         default: {
            nome:"default",
            valor:"0,00",
            imagem:"/media/media_f54686bb9632728a33aa8d7e4ddcc283.jpeg"
         },
      }
 
   },

   data: () => ({
      content:"Hello  World, this is a test",
      name: "Refrigerante Feel Good Lata 250ml",
      price: "2,49",
      img:"/media/media_f54686bb9632728a33aa8d7e4ddcc283.jpeg"
   }),

   methods: {

      add(){
         this.$emit("add", this.value)
      }

   }

})

