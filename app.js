/// DEPENDENCIES ///////////////////////////////////////////////////////////

import Layout from "./layouts/default.js"
import Home from "./pages/main.js"
import Checkout from "./pages/checkout.js"
import ClientInfo from "./pages/clientinfo.js"

import store from "./store/_stores.js"

// openPrompt();

// MUDANçA
setTimeout(()=>{
	// document.querySelector("#app > pwa-install").openPrompt()
},1000)
/// VUE SETTINGS ////////////////////////////////////////////////////////////

Vue.config.silent = true;

const router = new VueRouter({
	routes:[
		{path:"", component: Home},
		{path:"/checkout", component: Checkout},
		{path:"/client", component: ClientInfo},
	]
})

// Quasar.iconSet.set(Quasar.iconSet["eva-icons"])

/// MAIN COMPONENT SETUP ////////////////////////////////////////////////////

var vm = new Vue({

	router,
	store,
	el: '#app',
	// vuetify: new Vuetify(),

	components: {

		///// LAYOUTS
		Home,
		Checkout,
		"layout": Layout,
	},

	data(){
		return{
			
			checkout: false,

		}
	},

	async created() {
	    
	},

	destroyed() {
	},

	watch: {
	},

	computed: {
		
		...Vuex.mapState({ "productList": state => state.productList}),
		
	},

	methods: {

		gotoCheckout(){
			console.log('gotoCheckout');
			this.checkout=true;	
		}

	},

	async mounted() {

		this.$store.dispatch("init");
		// this.$store.commit("UPDATE_PRODUCTS", await update("produtos"));
		
		this.$store.watch((state) => state.cart, ()=>{
			this.$store.dispatch("sync");
			console.log("sync")
		})
		
	}

})

/// SERVER CONNECT ////////////////////////////////////////////////////
