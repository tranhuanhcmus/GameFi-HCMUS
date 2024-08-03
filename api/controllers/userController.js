const { STATUS_CODES, MAX_OWNER_ENERGY, COUNTDOWN_OWNER_ENERGY, GOLD_ID, GEM_ID } = require("../constants/index.js");
const models = require("../database/models")
const userServices = require('../services/userServices.js');
const moment = require('moment');
const { ContractController } = require("./ContractController.js");

const getEnergyNFT = async(req, res) => {
    const { tokenId } = req.params;
    try {
        const result = await models.NFT.findOne({ where: { tokenId: tokenId } })
        let new_energy
        let lastTimePlayed = result.lastTimePlayed
        let current_time = new Date()
        let last_time_played = new Date(result.lastTimePlayed)


        if (result.energy >= 3) {
            new_energy = result.energy
            lastTimePlayed = null
        } else {
            if (last_time_played < current_time) {
                new_energy = 3
            } else {
                let time_diff = last_time_played - current_time
                const hours = Math.floor(time_diff / (1000 * 60 * 60));
                const minutes = Math.floor((time_diff % (1000 * 60 * 60)) / (1000 * 60));

                let minus = minutes > 0 ? 1 : 0
                new_energy = MAX_OWNER_ENERGY - hours / COUNTDOWN_OWNER_ENERGY
                new_energy = new_energy - minus
            }
        }
        result.energy = new_energy;

        // Save the updated result
        await result.update({ energy: new_energy, lastTimePlayed: lastTimePlayed });
        await result.reload();

        return res.sendResponse(result, 'get energy success', STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
};
const getEnergyOwner = async(req, res) => {
    const { owner } = req.params;
    try {
        const result = await models.OwnerEnergy.findOne({ where: { owner: owner } })
        let new_energy
        let remainingTime = result.remainingTime
        let current_time = new Date()
        let last_time_played = new Date(result.remainingTime)


        if (result.energy >= 3) {
            new_energy = result.energy
            remainingTime = null
        } else {
            if (last_time_played < current_time) {
                new_energy = 3
            } else {
                let time_diff = last_time_played - current_time
                const hours = Math.floor(time_diff / (1000 * 60 * 60));
                const minutes = Math.floor((time_diff % (1000 * 60 * 60)) / (1000 * 60));

                let minus = minutes > 0 ? 1 : 0
                new_energy = MAX_OWNER_ENERGY - hours / COUNTDOWN_OWNER_ENERGY
                new_energy = new_energy - minus
            }
        }
        result.energy = new_energy;

        // Save the updated result
        await result.update({ energy: new_energy, remainingTime: remainingTime });
        await result.reload();

        return res.sendResponse(result, 'get energy success', STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
};

const updateEnergyOwner = async(req, res) => {

    const { owner } = req.params;
    const { tokenId } = req.body

    try {
        const result = await models.OwnerEnergy.findOne({ where: { owner: owner } })
        const nft = await models.NFT.findOne({ where: { tokenId: tokenId, owner: owner } })
        if (!result || !nft) {
            return res.sendResponse(null, `Not found owner ${owner} or nft ${tokenId}`, STATUS_CODES.INTERNAL_ERROR)
        }
        result.energy--;
        nft.energy--;


        if (!result.remainingTime) {
            let initValue = new Date();
            initValue.setHours(initValue.getHours() + 1);
            // initValue.setMinutes(initValue.getMinutes() + 1);
            result.remainingTime = initValue;
        } else {
            let updatedTime = new Date(result.remainingTime);
            updatedTime.setHours(updatedTime.getHours() + 1);
            // updatedTime.setMinutes(updatedTime.getMinutes() + 1);
            result.remainingTime = updatedTime;
        }
        let updateData = {...result.dataValues }

        await result.update(updateData);
        await result.reload();

        // update nft 
        if (!nft.lastTimePlayed) {
            let initValue = new Date();
            initValue.setHours(initValue.getHours() + 1);
            nft.lastTimePlayed = initValue;
        } else {
            let updatedTime = new Date(nft.lastTimePlayed);
            updatedTime.setHours(updatedTime.getHours() + 1);
            nft.lastTimePlayed = updatedTime;
        }
        let updateData_nft = {...nft.dataValues }

        await nft.update(updateData_nft);
        await nft.reload();

        return res.sendResponse({
            nft,
            result
        }, 'get energy success', STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }

};

const updateDB = async(req, res) => {
    const { from, to } = req.body

    try {
        ContractController.updateDB(from, to)

        return res.sendResponse(null, 'update DB success', STATUS_CODES.OK);
    } catch (error) {
        console.log(error);
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}

const checkDB = async(req, res) => {
    const { owner } = req.param

    try {
        //check energy
        let energy_row = await models.OwnerEnergy.findOne({ owner: owner })
        if (!energy_row) {
            await models.OwnerEnergy.create({
                owner: owner
            })
        }

        //check gold
        let gold_row = await models.ItemAppOwner.findOne({ owner: owner, id: GOLD_ID })
        if (!gold_row) {
            await models.ItemAppOwner.create({
                owner: owner,
                id: GOLD_ID,
                quantity: 0
            })
        }

        //check gem
        let gem_row = await models.ItemAppOwner.findOne({ owner: owner, id: GEM_ID })
        if (!gem_row) {
            await models.ItemAppOwner.create({
                owner: owner,
                id: GEM_ID,
                quantity: 0
            })
        }

        return res.sendResponse(null, 'CHECKING DB USER SUCCESS ', STATUS_CODES.OK)

    } catch (error) {
        console.log(error);
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR)
    }
}

module.exports = {
    updateEnergyOwner,
    getEnergyOwner,
    getEnergyNFT,
    updateDB,
    checkDB
};