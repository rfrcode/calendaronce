export const MixinPubSub = Base => class extends Base{
   #pubsub;
   #mixinvar;
    connectedCallback(){ 
        if(!this.#pubsub){
            let event = new CustomEvent('getpub',{
                bubbles:true,
                composed:true
            })
            this.dispatchEvent(event);
        }
    } 
    set pubSub(value){  
        if(value){
            this.#pubsub = value;
        }
    }
    get pubSub(){
        return this.#pubsub;
    }    
}




