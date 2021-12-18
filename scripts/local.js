export default class Local{

   static getLocally(){
      
      return this.unpack()

   }

   static saveLocally(packet) {

      // const local = this.unpack();

      let local = packet;

      this.repack(local)
      


   }

   static unpack(){
      const local = JSON.parse(localStorage.jsmartgo || "{}");
      // console.log("UNPACK", local)
      return local
   }
   
   static cleanCache(ref){

      let local = this.unpack()

      Object.assign(local,ref)
      
      this.repack(local)

   }

   static repack(local){
      localStorage.jsmartgo = JSON.stringify(local);
      // console.log("PACK", localStorage.jsmartgo)
   }

}
