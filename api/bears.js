class BearFactory {
    constructor() {
        this.eyePool = [0, 1, 2, 3, 4,5];
        this.furPool = [0, 1, 2, 3, 4,5];
        this.elementPool = [0, 1, 2, 3, 4,5];
        this.itemPool = [0, 1, 2, 3, 4,5];
    }

    getAttrs() {
        return Object.keys(this)
    }

    getRandomIndex(pool) {
        return pool[Math.floor(Math.random() * pool.length)];
    }

    getMutateBear(bear) {
        function formatPool(itemPool) {
            return "__" + itemPool.split("Pool")[0]
        }

        let mutateBear = bear

        let attrs = this.getAttrs()

        let selectedMutationPool = attrs[Math.floor(Math.random() * attrs.length)]

        const mutateAttrName = formatPool(selectedMutationPool)

        let newValue = this.getRandomIndex(this[selectedMutationPool])

        while (newValue === bear[mutateAttrName]) {
            //generate new Value
            newValue = this.getRandomIndex(this[selectedMutationPool])
        }

        mutateBear[mutateAttrName] = newValue

        return {
            mutateBear,
            mutateAttrName
        }
    }

    getRandomBear() {
        const randomEye = this.getRandomIndex(this.eyePool);
        const randomFur = this.getRandomIndex(this.furPool);
        const randomElement = this.getRandomIndex(this.elementPool);
        const randomItem = this.getRandomIndex(this.itemPool);

        return new Bear(randomEye, randomFur, randomElement, randomItem);
    }
    getPoolBear() {
        const pool = [];
        for (let eye of this.eyePool) {
            for (let fur of this.furPool) {
                for (let element of this.elementPool) {
                    for (let item of this.itemPool) {
                        const bear = new Bear(eye, fur, element, item);
                        pool.push(bear);
                    }
                }
            }
        }
        return pool;
    }
}

class Bear {
    constructor(eye = undefined, fur = undefined, element = undefined, item = undefined) {
        this.__eye = eye;
        this.__fur = fur;
        this.__element = element;
        this.__item = item;
    }
    getInfo() {
        return {
            eye: this.__eye,
            fur: this.__fur,
            element: this.__element,
            item: this.__item,
        }
    }
    getAttrs() {
        return Object.keys(this)
    }

}

module.exports = { BearFactory, Bear }