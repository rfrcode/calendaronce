export const MixinPubSub = Base => class extends Base {
    constructor(){
        super(...arguments);
        this._pubsub = null;
    }
    getPub() {
        if (!this._pubsub) {
            let event = new CustomEvent('getpub', {
                bubbles: true,
                composed: true
            })
            this.dispatchEvent(event);
        }
    }
    set pubSub(value) {
        if (value) {
            this._pubsub = value;
        }
    }
    get pubSub() {
        return this._pubsub;
    }
}

export const Disposables = Base => class extends Base {
    constructor(){
        super(...arguments);
        this._disposables = [];
    }
    get disposables(){
        return this._disposables;
    }
    dispose(){
        this._disposables.forEach(d=>d());
    }
}



