
let name = "Layout"

///////////////////////////////////////////// COMPONENT STRUCTURE

let template = jade.compile(`
q-layout(view='hHh Lpr fFf' )

  q-page-container
    .flex.self-stretch.scroll-full
        q-page.col-grow
            slot
            // q-scroll-area.full-height


`)({
  _TITLE:"_Template"
})

///////////////////////////////////////////// COMPONENT LOGIC

export default Vue.component(name,
{
    template,
    components: {
    },
    
    mixins: [],
    
    ///////////// PROPERTIES AND DATA /////////////

    props: {},

    data: () => ({}),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {},

    watch: {},
    
    methods: {

    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    mounted() {
        // document.querySelector(".scroll-full .scroll > .absolute").style.height = "100%"
    },


})

