// Split Vertical Layout containing 2 slots

let name = "SingleV"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`

// FLEXBOX EXAMPLE (TO USE WITH FIXED COMPONENTS)
.row.full-height
  .col.flex.column
      slot
          | v-slot:left
      

`)({
  _TITLE:"SingleV"
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
      title: String
    },

    data: () => ({

        focus: false,

        contentStyle: {
          backgroundColor: 'rgba(0,0,0,0.02)',
          color: '#555'
        },

        contentActiveStyle: {
          backgroundColor: '#eee',
          color: 'black'
        },

        thumbStyle: {
          right: '2px',
          borderRadius: '5px',
          backgroundColor: '#027be3',
          width: '5px',
          opacity: 0.75
        }

    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {},

    watch: {

      async $route(to, from) {
        this.focus = this.$route.query.f?this.$route.query.f:false;
        if(this.focus){
          this.$store.commit("AppBar/SET_STATE", 'back')
        }else{
          this.$store.commit("AppBar/SET_STATE", 'normal')
          if(this.title) this.$store.commit("AppBar/SET_TITLE", this.title)
        }
      },

    },
    
    methods: {
    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    mounted() {
      this.focus = this.$route.query.f?this.$route.query.f:false;
    },


})

