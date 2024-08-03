require('dotenv').config()
const { MAX_OWNER_ENERGY, GEM_ID, ETH_TO_GEM } = require('../constants');
const models = require("../database/models")

const CurrencyService = {
    depositETH: async function(sender, value) {
        try {

			let gem_deposit = Math.ceil(Number(value) * ETH_TO_GEM)
            const sender_row = await models.OwnerEnergy.findOne({ where: { owner: sender } });

            if (!sender_row) {
                await models.OwnerEnergy.create({
                    owner: sender,
                    energy: MAX_OWNER_ENERGY,
                    remainingTime: null
                })
            }

            const itemAppOwner = await models.ItemAppOwner.findOne({ where: { id: GEM_ID, owner: sender } })
            if (!itemAppOwner) {
                await models.ItemAppOwner.create({
                    id: GEM_ID,
                    owner: sender,
                    quantity: gem_deposit
                })
            } else {
                let updated_quantity = itemAppOwner.quantity += gem_deposit
                await itemAppOwner.update({ quantity: updated_quantity })
            }

			console.log(`Deposit ${gem_deposit} Gem for ${sender} success!`);

        } catch (error) {
            console.log("CurrencyService.depositETH");
            console.log(error);
        }
    }
}
module.exports = {
    CurrencyService
}