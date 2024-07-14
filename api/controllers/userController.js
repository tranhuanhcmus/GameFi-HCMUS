const { STATUS_CODES, MAX_OWNER_ENERGY, COUNTDOWN_OWNER_ENERGY } = require("../constants/index.js");
const models = require("../database/models")
const userServices = require('../services/userServices.js');
const moment = require('moment')

const userNFTs = async(req, res) => {
    const { owner } = req.params;
    console.log("owner: ", owner);
    try {
        const nfts = await userServices.getNFTbyOwner(owner);
        if (nfts.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng.' });
        }
        let result = [];
        for (let i = 0; i < nfts.length; i++) {
            let uri = nfts[i].tokenuri;
            console.log("uri: ", uri);
            let JSONdata = await userServices.getTokenURIData(uri);
            result.push({...nfts[i], JSONdata: JSONdata.data })
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' + error });
    }
};

const updateNFTOwner = async(req, res) => {
    const { tokenid, to } = req.body;
    console.log(tokenid, to);
    try {
        const result = await userServices.updateNFTOwner(tokenid, to);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật NFT Owner.' });
    }
};

const getEnergyNFT = async(req, res) => {
    const { tokenId } = req.params;
    try {
        const result = await models.NFT.findOne({ where: { tokenId: tokenId} })
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

const updateNFTExp = async(req, res) => {
    const { tokenid, exp } = req.body;
    console.log(tokenid, exp);
    try {
        const result = await userServices.updateNFTExp(tokenid, exp);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật NFT Owner.' });
    }
};

const getAllTokenURI = async(req, res) => {
    try {
        const user = await userServices.getAllTokenURIData();
        // console.log(user);
        if (user.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin Token URI.' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin Token URI.' });
    }
};

const getTokenURI = async(req, res) => {
    const { tokenURI } = req.body;
    console.log("tokenURI: ", tokenURI);
    try {
        const user = await userServices.getTokenURIData(tokenURI);
        // console.log(user);
        if (user.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin Token URI.' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin Token URI.' });
    }
};

const createTokenURI = async(req, res) => {
    const { tokenURI } = req.body;
    console.log(tokenURI);
    try {
        const result = await userServices.createTokenURI(tokenURI);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm TokenURI.' });
    }
};

const updateTokenURI = async(req, res) => {
    const { tokenURI } = req.body;
    console.log(tokenURI);
    try {
        const result = await userServices.updateTokenURI(tokenURI);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật TokenURI.' });
    }
};

const getItemGame = async(req, res) => {
    try {
        const result = await userServices.getItemGame();
        console.log(`Lấy thông tin ItemGame thành công: `, result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lấy thông tin ItemGame không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGame.' }); // Trả về lỗi cho client
    }
};

const getItemGameById = async(req, res) => {
    const { itemId } = req.params;
    console.log("itemId: ", itemId);
    try {
        const result = await userServices.getItemGameById(itemId);
        console.log(`Lấy thông tin ItemGame ${itemId} thành công: `, result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lấy thông tin ItemGame không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGame.' }); // Trả về lỗi cho client
    }
};

const getItemApp = async(req, res) => {
    try {
        const result = await userServices.getItemApp();
        console.log(`Lấy thông tin ItemApp thành công: `, result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lấy thông tin ItemApp không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemApp.' }); // Trả về lỗi cho client
    }
};

const getItemAppById = async(req, res) => {
    const { itemId } = req.params;
    console.log("itemId: ", itemId);
    try {
        const result = await userServices.getItemAppById(itemId);
        console.log(`Lấy thông tin ItemApp ${itemId} thành công: `, result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lấy thông tin ItemApp không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemApp.' }); // Trả về lỗi cho client
    }
};

const createItemGame = async(req, res) => {
    const { name, description, category, quality, gemcost, goldcost, HP, attack, def, duration } = req.body;
    try {
        const result = await userServices.createItemGame(name, description, category, quality, gemcost, goldcost, HP, attack, def, duration);
        console.log('Tạo mới ItemGame thành công:', result);
        return res.status(201).json(result); // Trả về kết quả cho client và HTTP status code 201 (Created)
    } catch (error) {
        console.log('Lỗi khi tạo mới ItemGame:', error.message);
        return res.status(500).json({ error: 'Lỗi khi tạo mới ItemGame.' }); // Trả về lỗi cho client
    }
};

const createItemApp = async(req, res) => {
    const { name, description, category, quality, gemcost, goldcost } = req.body;
    try {
        const result = await userServices.createItemApp(name, description, category, quality, gemcost, goldcost);
        console.log('Tạo mới ItemApp thành công:', result);
        return res.status(201).json(result); // Trả về kết quả cho client và HTTP status code 201 (Created)
    } catch (error) {
        console.log('Lỗi khi tạo mới ItemApp:', error.message);
        return res.status(500).json({ error: 'Lỗi khi tạo mới ItemApp.' }); // Trả về lỗi cho client
    }
};

const updateItemGame = async(req, res) => {
    const { itemId, name, description, category, quality, gemcost, goldcost, HP, attack, def, duration } = req.body;
    try {
        const result = await userServices.updateItemGame(itemId, name, description, category, quality, gemcost, goldcost, HP, attack, def, duration);
        console.log('Cập nhật thông tin ItemGame thành công:', result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemGame:', error.message);
        return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemGame.' }); // Trả về lỗi cho client
    }
};

const updateItemApp = async(req, res) => {
    const { itemId, name, description, category, quality, gemcost, goldcost } = req.body;
    try {
        const result = await userServices.updateItemApp(itemId, name, description, category, quality, gemcost, goldcost);
        console.log('Cập nhật thông tin ItemApp thành công:', result);
        return res.json(result); // Trả về kết quả cho client
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemApp:', error.message);
        return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemApp.' }); // Trả về lỗi cho client
    }
};

const getItemGameOwnership = async(req, res) => {
    const { owner } = req.params;
    console.log("owner: ", owner);
    try {
        const result = await userServices.getItemGameOwnership(owner);
        console.log(`Lấy thông tin ItemGameOwnership của người sở hữu ${owner} thành công: `, result);
        return res.json(result);
    } catch (error) {
        console.log('Lấy thông tin ItemGameOwnership không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGameOwnership.' });
    }
};

const getItemAppOwnership = async(req, res) => {
    const { owner } = req.params;
    console.log("owner: ", owner);
    try {
        const result = await userServices.getItemAppOwnership(owner);
        console.log(`Lấy thông tin ItemAppOwnership của cho người sở hữu ${owner} thành công: `, result);
        return res.json(result);
    } catch (error) {
        console.log('Lấy thông tin ItemAppOwnership không thành công:', error.message);
        return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemAppOwnership.' });
    }
};

const createItemGameOwnership = async(req, res) => {
    const { itemId, owner, quantity } = req.body;
    try {
        const result = await userServices.createItemGameOwnership(itemId, owner, quantity);
        console.log('Tạo mới ItemGameOwnership thành công:', result);
        return res.json(result);
    } catch (error) {
        console.log('Lỗi khi tạo mới ItemGameOwnership:', error.message);
        return res.status(500).json({ error: 'Lỗi khi tạo mới ItemGameOwnership.' });
    }
};

const createItemAppOwnership = async(req, res) => {
    const { itemId, owner, quantity } = req.body;
    try {
        const result = await userServices.createItemAppOwnership(itemId, owner, quantity);
        console.log('Tạo mới ItemAppOwnership thành công:', result);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi tạo mới ItemAppOwnership.' });
    }
};

const updateItemGameOwnership = async(req, res) => {
    const { itemId, owner, quantity } = req.body;
    try {
        const result = await userServices.updateItemGameOwnership(itemId, owner, quantity);
        console.log('Cập nhật thông tin ItemGameOwnership thành công:', result);
        return res.json(result);
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemGameOwnership:', error.message);
        return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemGameOwnership.' });
    }
};

const updateItemAppOwnership = async(req, res) => {
    const { itemId, owner, quantity } = req.body;
    try {
        const result = await userServices.updateItemAppOwnership(itemId, owner, quantity);
        console.log('Cập nhật thông tin ItemAppOwnership thành công:', result);
        return res.json(result);
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemAppOwnership:', error.message);
        return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemAppOwnership.' });
    }
};

module.exports = {
    updateEnergyOwner,
    getEnergyOwner,
    getEnergyNFT,
};