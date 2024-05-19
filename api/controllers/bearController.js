const { BearFactory, Bear } = require("../bears")
const { STATUS_CODES } = require("../constants");
const models = require("../database/models");

const breedBear = async(req, res) => {
    try {
        const {dad, mom} = req.body;
        const factory = new BearFactory();
        const bearDad = new Bear(dad.eye, dad.fur, dad.element, dad.item);
        // const bearDad = new Bear().importBear(dad);
        const bearMom = new Bear(mom.eye, mom.fur, mom.element, mom.item);
        const bears = factory.crossover(bearDad, bearMom);
        let random = Math.random();
        let myBear = (random < 0.5) ? bears[0] : bears[1];
        myBear = factory.getMutateBear(myBear).mutateBear;
        myBear.__name = "Test Breeded Bear";
        myBear.__rarity = "Normal";
        myBear.__image = "/uploads/gem.jpg";
        return res.sendResponse(myBear, "Breed bear success", STATUS_CODES.OK);

    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}

const getBear = async(req, res) => {
    try {
        const bear = req.body;
        const bearEye = await models.EyePool.findOne({ where: { id: bear.eye } });
        const bearElement = await models.ElementPool.findOne({ where: { id: bear.element } });
        const bearFur = await models.FurPool.findOne({ where: { id: bear.fur } });
        const bearItem = await models.ItemPool.findOne({ where: { id: bear.item } });
        let myBear = {};
        myBear["eye"] = { id: bearEye.id, description: bearEye.description };
        myBear["element"] = { id: bearElement.id, description: bearElement.description };
        myBear["fur"] = { id: bearFur.id, description: bearFur.description };
        myBear["item"] = { id: bearItem.id, description: bearItem.description };
        return res.sendResponse(myBear, "Get bear success", STATUS_CODES.OK);

    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}


module.exports={
	breedBear,getBear
}