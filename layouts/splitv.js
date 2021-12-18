// Split Vertical Layout containing 2 slots

let name = "SplitV"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

// FLEXBOX EXAMPLE (TO USE WITH FIXED COMPONENTS)
.row.full-height
  .col-xs-12.col-sm-12.col-md-4.flex.column
      div.col-2.bg-negative
      q-scroll-area.col-grow
          slot(name="left")
            | v-slot:left
      div.col-2.bg-negative
  .col-xs-0.col-sm-0.col-md-8.gt-sm
      slot(name="right")
          | v-slot:left  

//q-splitter.flex.full-height(v-model="splitterModel" unit="px")
    template(slot="before")
        slot(name="left")
    template(slot="after")
        slot(name="right")
      

`)({
  _TITLE:"SplitV"
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
    },

    data: () => ({
        splitterModel:500,
    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {},

    watch: {},
    
    methods: {
    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    mounted() {},


})

