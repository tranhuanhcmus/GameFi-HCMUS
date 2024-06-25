const { BearFactory, Bear } = require('../bears');
const { STATUS_CODES, BEAR_GATEWAY_IPFS } = require('../constants');
const models = require('../database/models');

const breedBear = async (req, res) => {
	try {
		let { dad, mom } = req.body;
		dad=dad.toString()
		mom=mom.toString()

		const factory = new BearFactory();
		const bearDad = new Bear(dad[0], dad[1], dad[2], dad[3]);
		const bearMom = new Bear(mom[0], mom[1], mom[2], mom[3]);
		// const bearDad = new Bear().importBear(dad);
		const bears = factory.crossover(bearDad, bearMom);
		let random = Math.random();
		let myBear = random < 0.5 ? bears[0] : bears[1];
		// myBear = factory.getMutateBear(myBear).mutateBear;
		let my_bear_id=myBear.getId()
		
		const result = await models.NFT.findOne({ where: { tokenId: my_bear_id } })
		if(!result){
			return res.sendResponse(null, `Not found NFT with tokenID: ${my_bear_id}`, STATUS_CODES.NOT_FOUND);
		}
        let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: result.tokenUri } })
        result.dataValues.data=tokenUri.data

		return res.sendResponse(result, 'Breed bear success', STATUS_CODES.OK);
	} catch (error) {
		return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
	}
};

const getBear = async (req, res) => {
	try {
		const { bear } = req.body;
		console.log(bear.eye, bear.fur, bear.element, bear.item);
		const bearEye = await models.EyePool.findOne({ where: { id: bear.eye } });
		const bearElement = await models.ElementPool.findOne({
			where: { id: bear.element },
		});
		const bearFur = await models.FurPool.findOne({ where: { id: bear.fur } });
		const bearItem = await models.ItemPool.findOne({
			where: { id: bear.item },
		});
		let myBear = {};
		myBear['eye'] = { id: bearEye.id, description: bearEye.description };
		myBear['element'] = {
			id: bearElement.id,
			description: bearElement.description,
		};
		myBear['fur'] = { id: bearFur.id, description: bearFur.description };
		myBear['item'] = { id: bearItem.id, description: bearItem.description };
		return res.sendResponse(myBear, 'Get bear success', STATUS_CODES.OK);
	} catch (error) {
		return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR);
	}
};

module.exports = {
	breedBear,
	getBear,
};
