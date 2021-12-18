const name = "FooterCheckout"

const purpose= "Wrapper for Autocomplete Online Search"

///////////////////////////////////////////// COMPONENT STRUCTURE

const template = jade.compile(`


q-footer.bg-grey-3.shadow-up-11( height-hint="150")
   q-toolbar.bg-grey-3(style="height:60px")
      slot
         
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
 
   },

   data: () => ({
 
   }),

   methods: {

 
   }

})

