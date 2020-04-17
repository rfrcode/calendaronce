export const MixinPubSub = Base => class extends Base {
    #pubsub;
    getPub() {
        if (!this.#pubsub) {
            let event = new CustomEvent('getpub', {
                bubbles: true,
                composed: true
            })
            this.dispatchEvent(event);
        }
    }
    set pubSub(value) {
        if (value) {
            this.#pubsub = value;
        }
    }
    get pubSub() {
        return this.#pubsub;
    }
}

export const Disposables = Base => class extends Base {
    #diposables = [];
    get disposables(){
        return this.#diposables;
    }
    dispose(){
        this.#diposables.forEach(d=>d());
    }
}
