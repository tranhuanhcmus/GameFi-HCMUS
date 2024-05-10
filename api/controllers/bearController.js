const { BearFactory, Bear } = require("../bears")
const { STATUS_CODES } = require("../constants")

const breedBear = async(req, res, next) => {
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

module.exports={
	breedBear,
}