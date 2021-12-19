const name = "ItemList"

const purpose= "Wrapper for Autocomplete Online Search"

///////////////////////////////////////////// COMPONENT STRUCTURE

const template = jade.compile(`

q-list.rounded-borders
    q-slide-item(@left='onLeft', @right='onRight', v-for='item in value', :key='item', left-color="grey" right-color="red")
        template(v-slot:left='')
            q-icon(name='info')
        //template(v-slot:right='')
            q-icon(name='delete')

        q-item.q-py-md(@click="selection(item)" clickable, v-ripple)
            //q-item-section(avatar, top)
                q-avatar(:icon='icon', :color='color', text-color='white')
            q-item-section
                q-item-label(style="font-weight:400; font-size: 16px" lines='1') {{item.name}}
                q-item-label.text-grey-6 {{item.description}}
            q-item-section(side)
                slot(:item="item")
                q-item-label(style="font-weight:400; font-size: 16px" lines='1') \${{item.value}}
                //q-icon(name='eva-info-outline', color='green')
        q-separator

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

      value: {
        type: Array,
        default: [
          {name: "Example 1", description: "Lorem Ipsum Dolor sit amet"},
          {name: "Example 2", description: "Lorem Ipsum Dolor sit amet"}
        ]
      },

      title: String,

      list: {
        type: Array,
        default: [
          {name: "Example 1", description: "Lorem Ipsum Dolor sit amet"},
          {name: "Example 2", description: "Lorem Ipsum Dolor sit amet"}
        ]
      },

      service: String,

      icon: {
        type:String,
        default: "eva-plus-circle-outline"
      },

      color:{
        type: String,
        default: 'primary'
      },

      textfield: {
        type: String,
        default: "name",
      },

      descriptionfield: {
        type: String,
        default: "description",
      },

      multiple: {
        type:Boolean,
        default: false
      },

      filter: {
        type: Function,
        default: (el)=>el
      }


    },

    data: () => ({

        isLoading: false,
        items: [],
        model: null,
        search: null,

    }),

    ///////////// PROPERTIES AND DATA /////////////
    
    computed: {

      textfieldDotted(){ 

        // console.log(_.get(item,this.descriptionfield,"name"))
        return (item) => _.get(item,this.textfield,"name")

      },

      descriptionfieldDotted(){

        // console.log(_.get(item,this.descriptionfield,"description"))
        return (item) => _.get(item,this.descriptionfield,"description")

      },

    },

    watch: {

      value(val){
        // console.log(val)
        this.$emit("update:value",val)
      },

      search (val) {
        if(val)
          this.debounceSearch()
      },

    },
    
    methods: {

      selection(item){
        this.$emit("selection",item)
      }

    },

    ///////////// HOOKS ////////////////////////////
    
    created() {},
    mounted() {},


})
