const { WALLET_PUBLIC_KEY } = require("./controllers/ContractController");
const models = require("./database/models")
class BearFactory {
    constructor() {
        this.elementPool = [1, 2, 3, 4, 5, 6];
        this.furPool = [1, 2, 3, 5, 7, 8, 9]
        this.eyePool = [1, 2, 3, 6, 7];
        this.itemPool = [1, 6, 7, 8];
    }

    getAttrs() {
        return Object.keys(this);
    }

    getRandomIndex(pool) {
        return pool[Math.floor(Math.random() * pool.length)];
    }

    getMutateBear(bear) {
        function formatPool(itemPool) {
            return '__' + itemPool.split('Pool')[0];
        }

        let mutateBear = bear;

        let attrs = this.getAttrs();

        let selectedMutationPool = attrs[Math.floor(Math.random() * attrs.length)];

        const mutateAttrName = formatPool(selectedMutationPool);

        let newValue = this.getRandomIndex(this[selectedMutationPool]);

        while (newValue === bear[mutateAttrName]) {
            //generate new Value
            newValue = this.getRandomIndex(this[selectedMutationPool]);
        }

        mutateBear[mutateAttrName] = newValue;
        console.log(mutateBear, "atr\n" + mutateAttrName);
        return {
            mutateBear,
            mutateAttrName,
        };
    }

    getRandomBear() {
        const randomEye = this.getRandomIndex(this.eyePool);
        const randomFur = this.getRandomIndex(this.furPool);
        const randomElement = this.getRandomIndex(this.elementPool);
        const randomItem = this.getRandomIndex(this.itemPool);

        const name = 'RandomBear'
        const imageID = [randomEye, randomFur, randomElement, randomItem].join("")
        const image = 'bear' + `_${imageID}` + `.png`;

        return new Bear(randomEye, randomFur, randomElement, randomItem, name, 'Normal', image);
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
    crossover(mother, father) {
        let son = new Bear();
        let daughter = new Bear();

        function crossOver(attr) {
            son[attr] = father[attr];
            daughter[attr] = mother[attr];

            let random = Math.random();

            if (random < 0.5) {
                // swap
                let temp = son[attr];
                son[attr] = daughter[attr];
                daughter[attr] = temp;
            }
        }

        for (let attr of new Bear().getAttrs()) {
            crossOver(attr);
        }

        return [son, daughter];
    }
    async breed(mother, father) {
        let momID = mother.getId()
        let dadID = father.getId()

       
        let result = []
        for (let i = 0; i < dadID.length; i++) {
            let splitted_array = dadID.split('')
            splitted_array[i] = momID[i]
            result.push(splitted_array.join(''))
        }
        for (let i = 0; i < momID.length; i++) {
            let splitted_array = momID.split('')
            splitted_array[i] = dadID[i]
            result.push(splitted_array.join(''))
        }
        // format 
        result = result.filter(item => (item != dadID && item != momID))
        result = [...new Set(result)]

        let randomChildID
        let is_valid = false
        while (!is_valid) {
            if (result.length === 0) {
                randomChildID = null
                is_valid = true
                break
            }
            randomChildID = parseInt(result[Math.floor(Math.random() * result.length)])
            let nft = await models.NFT.findOne({ where: { tokenId: randomChildID } })

            if (nft?.owner == WALLET_PUBLIC_KEY)
                is_valid = true
            else result = result.filter(item => item != randomChildID)
        }
        return randomChildID;
    }
}

class Bear {
    constructor(
        element = undefined,
        fur = undefined,
        eye = undefined,
        item = undefined,
        name = undefined,
        rarity = undefined,
        image = undefined,
        asset = undefined
    ) {
        this.__eye = eye;
        this.__fur = fur;
        this.__element = element;
        this.__item = item;
        this.__name = name;
        this.__rarity = rarity;
        this.__image = image;
        this.__asset = asset;
    }
    getInfo() {
        return {
            element: this.__element,
            fur: this.__fur,
            eye: this.__eye,
            item: this.__item,
            name: this.__name,
            rarity: this.__rarity,
            image: this.__image,
            asset: this.__asset,
        };
    }
    getId() {
        return `${this.__element}${this.__fur}${this.__eye}${this.__item}`
    }
    importBear(bear) {
        this.__eye = bear.eye;
        this.__fur = bear.fur;
        this.__element = bear.element;
        this.__item = bear.item;
        this.__name = bear.name;
        this.__rarity = bear.rarity;
        this.__image = bear.image;
        this.__asset = bear.asset;
    }
    getAttrs() {
        // return Object.keys(this);
        return ['__eye', '__fur', '__element', '__item']
    }
}

async function run(){
    const factory = new BearFactory()
    const dad = new Bear(1, 1, 1, 1)
    const mom = new Bear(2, 2, 2, 7)
    
    let child=await factory.breed(dad, mom);
    console.log(child);
}
// run()
// console.log(bear);
module.exports = { BearFactory, Bear };