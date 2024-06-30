const { BearFactory, Bear } = require('../bears');
const { STATUS_CODES, BEAR_GATEWAY_IPFS } = require('../constants');
const models = require('../database/models');
const { ContractController, WALLET_PUBLIC_KEY } = require('./ContractController');

const breedBear = async (req, res) => {
	try {
		let { dad, mom, owner } = req.body;
		dad=dad.toString()
		mom=mom.toString()

		const factory = new BearFactory();
		const bearDad = new Bear(dad[0], dad[1], dad[2], dad[3]);
		const bearMom = new Bear(mom[0], mom[1], mom[2], mom[3]);
		// const bearDad = new Bear().importBear(dad);
		let child= await factory.breed(bearDad,bearMom)

		if(!child){
			return res.sendResponse(null, `All children of this dad and mom already generated!`);
		}
		const result = await models.NFT.findOne({ where: { tokenId: child } })
		
        let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: result.tokenUri } })
        result.dataValues.data=tokenUri.data

		// transfer to Owner
		// ContractController.transferFrom(WALLET_PUBLIC_KEY,owner,result.tokenId)

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
