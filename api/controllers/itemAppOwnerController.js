const { STATUS_CODES, RANDOM_PERCENT_NFT } = require("../constants")
const models = require("../database/models")
const { Op, where } = require('sequelize');
const { ContractController } = require("./ContractController");
require('dotenv').config()

const getAll = async(req, res, next) => {
    try {
        const list = await models.ItemAppOwner.findAll(
            {   
                where: {
                    quantity: {
                        [Op.gt]: 0 // Sử dụng toán tử Op.gt để lấy các phần tử có quantity > 0
                    }
                }
            }
        );

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.ItemAppOwner.find(
            { 
                where: 
                { 
                    id: id, 
                    quantity: {
                        [Op.gt]: 0 // Sử dụng toán tử Op.gt để lấy các phần tử có quantity > 0
                    } 
                } 
            }
        );

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getByOwner = async(req, res, next) => {
    try {
        const { owner } = req.params;
        const results = await models.ItemAppOwner.findAll(
            { 
                where: 
                { 
                    owner: owner, 
                    quantity: {
                        [Op.gt]: 0 // Sử dụng toán tử Op.gt để lấy các phần tử có quantity > 0
                    } 
                } 
            }
        );

        if (!results || results.length === 0) {
            return res.sendResponse(null, `Not Found Owner ${owner}`, STATUS_CODES.NOT_FOUND);
        }

        // Lặp qua mảng kết quả
        for (const result of results) {
            // console.log(result.dataValues.id);
            // Gọi hàm getById để lấy thông tin chi tiết của mỗi id
            const detailedResult = await models.ItemApp.findOne({ where: { id: result.dataValues.id } })
                // console.log(detailedResult.dataValues.description);
                // Kiểm tra kết quả từ hàm getById và xử lý phản hồi
            if (!detailedResult) {
                // Nếu không tìm thấy hoặc có lỗi, trả về lỗi tương ứng
                return res.sendResponse(null, `Error fetching details for ID ${result.dataValues.id}`, detailedResult ? detailedResult.status : STATUS_CODES.INTERNAL_ERROR);
            }
            // Nếu thành công, gắn thông tin chi tiết vào mảng kết quả
            result.dataValues.name = detailedResult.dataValues.name;
            result.dataValues.description = detailedResult.dataValues.description;
            result.dataValues.category = detailedResult.dataValues.category;
            result.dataValues.quality = detailedResult.dataValues.quality;
            result.dataValues.itemquantity = detailedResult.dataValues.quantity;
            result.dataValues.gemcost = detailedResult.dataValues.gemcost;
            result.dataValues.goldcost = detailedResult.dataValues.goldcost;
            result.dataValues.image = detailedResult.dataValues.image;
            console.log(result);
        }

        // Trả về kết quả đã được mapping thông tin chi tiết
        return res.sendResponse(results, `Get Owner ${owner} App Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const useItemForOwner = async(req, res, next) => {
    try {
        const { owner, id, quantity, tokenId } = req.body;

        // Fetch the ItemAppOwner entry
        const itemOwner = await models.ItemAppOwner.findOne({ where: { id, owner } });

        if (!itemOwner) {
            return res.sendResponse(null, `Owner ${owner} does not own the selected item.`, STATUS_CODES.NOT_FOUND);
        }

        if (quantity > itemOwner.dataValues.quantity) {
            return res.sendResponse(null, `Owner ${owner} does not have enough of the selected item.`, STATUS_CODES.NOT_FOUND);
        }

        // Fetch the ItemApp details
        const itemApp = await models.ItemApp.findOne({ where: { id } });

        if (!itemApp) {
            return res.sendResponse(null, `Error fetching details for Item ID ${id}`, STATUS_CODES.INTERNAL_ERROR);
        }

        // Map detailed item data
        const detailedResult = {
            ...itemOwner.dataValues,
            name: itemApp.dataValues.name,
            description: itemApp.dataValues.description,
            category: itemApp.dataValues.category,
            quality: itemApp.dataValues.quality,
            itemquantity: itemApp.dataValues.quantity,
            gemcost: itemApp.dataValues.gemcost,
            goldcost: itemApp.dataValues.goldcost,
            image: itemApp.dataValues.image,
            totalpoint: quantity * itemApp.dataValues.quantity
        };
        console.log("detailedResult: \n", detailedResult);

        // Update NFT exp
        if (detailedResult.category === "food" && tokenId) {
            const nftResult = await models.NFT.findOne({ where: { tokenId: tokenId } })
            if (!nftResult) {
                return res.sendResponse(null, `Error fetching NFT details for ID ${tokenId}`, STATUS_CODES.INTERNAL_ERROR);
            }

            console.log(nftResult);
            const currentEnergy = nftResult.dataValues.exp;
            const updateExp = currentEnergy + detailedResult.totalpoint;

            await nftResult.update({ exp: updateExp });
            await nftResult.reload();

            // ------- NFT Contract -------
            await ContractController.addExp(tokenId,detailedResult.totalpoint)
        }
        // Update item quantity
        const updatedQuantity = itemOwner.dataValues.quantity - quantity;
        await itemOwner.update({ quantity: updatedQuantity });
        await itemOwner.reload();
        // Prepare and return the response
        return res.sendResponse(detailedResult, `Used item ${itemApp.dataValues.name} for user ${owner} successfully.`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message || error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.ItemAppOwner.findOne({ where: { id: id } })

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        } else {
            await row.destroy()

            return res.sendResponse(null, `Delete ID ${id} success`, STATUS_CODES.OK)
        }

    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getRandomQuality = (quality) => {
    const rand = Math.random() * 100;
    console.log(rand);

    let thresholds;

    switch (quality) {
        case 'normal':
            thresholds = [50, 80];
            break;
        case 'rare':
            thresholds = [40, 70];
            break;
        case 'super rare':
            thresholds = [30, 60];
            break;
        default:
            throw new Error('Invalid quality value');
    }

    if (rand < thresholds[0]) {
        return 'normal';
    } else if (rand < thresholds[1]) {
        return 'rare';
    } else {
        return 'super rare';
    }
};
const victoryReward = async (req, res, next) => {
    try {
        const  { ownerData } = req.params;
        const itemCategory = ["food", "boost", "energy", "background"];
        const currencyId = ["7dc748d5-de7d-4a76-9a58-62463ee7be14", "1a06543f-42c7-402f-a22a-32594b58c0e5"]; // 0 is gem, 1 is gold

        // Add item food
        const randomQuality = getRandomQuality("super rare");
        const randomCategory = "food";
        console.log(randomQuality);
        const items = await models.ItemApp.findAll({
            where: {
                category: randomCategory,
                quality: randomQuality
            }
        });

        if (!items.length) {
            return res.sendResponse(null, `No items found for category ${randomCategory} with quality ${randomQuality}`, STATUS_CODES.NOT_FOUND);
        }

        const randomItem = items[Math.floor(Math.random() * items.length)];
        console.log("randomItem: ", randomItem.dataValues);
        const randomItemQuantity = Math.floor(Math.random() * 3) + 1;
        console.log("randomItemQuantity: ", randomItemQuantity);
        const row = await models.ItemAppOwner.findOne({ where: { id: randomItem.dataValues.id, owner: ownerData } });

        let result;
        if (row) {
            const updateData = {
                id: randomItem.dataValues.id,
                owner: ownerData,
                quantity: row.dataValues.quantity + randomItemQuantity
            };
            // console.log("updateData: \n", updateData);

            await row.update(updateData);
            await row.reload();
            result = row;
        } else {
            const newRow = {
                id: randomItem.dataValues.id,
                owner: ownerData,
                quantity: randomItemQuantity
            };
            // console.log("newRow: \n", newRow);
            result = await models.ItemAppOwner.create(newRow);
        }

        // Add cup
        const randomCup = Math.floor(Math.random() * 6) + 5;
        console.log("randomCup: ", randomCup);
        const upsertData = {
            owner: ownerData,
            cup: randomCup
        };
        const [response, created] = await models.Cup.upsert(upsertData);

        // Add gold
        const userCurrencyBalance = await models.ItemAppOwner.findOne({ where: { id: currencyId[1], owner: ownerData } });
        const totalGold = Math.floor(Math.random() * 6) + 7;
        console.log("totalGold: ", totalGold);
        const updateCurrencyData = {
            id: currencyId[1],
            owner: ownerData,
            quantity: userCurrencyBalance.quantity + totalGold
        };
        await userCurrencyBalance.update(updateCurrencyData);
        await userCurrencyBalance.reload();

        // format return data
        console.log(userCurrencyBalance.dataValues);
        console.log(result.dataValues);
        console.log(response.dataValues);

        const resultDetail = await models.ItemApp.findOne({ where: { id: result.dataValues.id } });
        userCurrencyBalance.dataValues.quantity = totalGold;
        resultDetail.dataValues.quantity = randomItemQuantity;
        response.dataValues.cup = randomCup;

        const responseObj = {
            currencyData: userCurrencyBalance.dataValues,
            itemData: resultDetail.dataValues,
            cupData: response.dataValues
        };
        console.log(responseObj);
        return res.sendResponse(responseObj, `Generated reward for user ${ownerData}`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
};
const purchaseItemPack = async(req, res, next) => {
    try {
        const rowData = req.body;
        console.log(rowData);
        const currencyId = ["7dc748d5-de7d-4a76-9a58-62463ee7be14", "1a06543f-42c7-402f-a22a-32594b58c0e5"]; // 0 is gem, 1 is gold
        const currency = rowData.currency;
        console.log(currencyId[currency], rowData.owner)
        const userCurrencyBalance = await models.ItemAppOwner.findOne({ where: { id: currencyId[currency], owner: rowData.owner } });
        if (rowData.id === currencyId[0] && currencyId[currency] === currencyId[1]) {
            return res.sendResponse(null, 'Cannot use gold to purchase gem.', STATUS_CODES.NOT_FOUND);
        }
        const totalPrice = (currency == 0) ? rowData.gemcost * rowData.quantity : rowData.goldcost * rowData.quantity;
        console.log(userCurrencyBalance.quantity, totalPrice);
        if (userCurrencyBalance.quantity < totalPrice) {
            return res.sendResponse(null, 'Your balance is not sufficient for this item', STATUS_CODES.NOT_FOUND);
        } else {
            const itemCategory = ["food", "boost", "energy", "background"];
            if (!itemCategory.includes(rowData.category)) {
                return res.sendResponse(null, `Invalid category ${rowData.category} for open pack`, STATUS_CODES.NOT_FOUND);
            }
            const itemQuality = ["normal", "rare", "super rare"];
            if (!itemQuality.includes(rowData.quality)) {
                return res.sendResponse(null, `Invalid quality ${rowData.quality} for open pack`, STATUS_CODES.NOT_FOUND);
            }
            const randomQuality = getRandomQuality(rowData.quality);
            console.log(randomQuality);
            const items = await models.ItemApp.findAll({
                where: {
                    category: rowData.category,
                    quality: randomQuality
                }
            });

            if (!items.length) {
                return res.sendResponse(null, `No items found for category ${rowData.category} with quality ${randomQuality}`, STATUS_CODES.NOT_FOUND);
            }

            const randomItem = items[Math.floor(Math.random() * items.length)];
            console.log("randomItem: ", randomItem.dataValues);
            const row = await models.ItemAppOwner.findOne({ where: { id: randomItem.dataValues.id, owner: rowData.owner } });
            if (row) {
                const updateData = {
                    id: randomItem.dataValues.id,
                    owner: rowData.owner,
                    quantity: row.dataValues.quantity + rowData.quantity
                }
                console.log("updateData: \n", updateData);

                await row.update(updateData);
                await row.reload();
            } else {
                const newRow = {
                    id: randomItem.dataValues.id,
                    owner: rowData.owner,
                    quantity: rowData.quantity
                }
                console.log("newRow: \n", newRow);
                const result = await models.ItemAppOwner.create(newRow);
            }
            const updateCurrencyData = {
                id: currencyId[currency],
                owner: rowData.owner,
                quantity: userCurrencyBalance.quantity - totalPrice
            }
            await userCurrencyBalance.update(updateCurrencyData);
            await userCurrencyBalance.reload();

            let extra_nft=null
            let randomPercent = RANDOM_PERCENT_NFT 
            let is_get_new_nft = Math.random() < randomPercent && randomQuality =='super rare';
            if(is_get_new_nft){
                //get valid NFT

                const WALLET_PUBLIC_KEY=process.env.WALLET_PUBLIC_KEY
                let valid_nft_list= await models.NFT.findAll({where:{owner: WALLET_PUBLIC_KEY}})
                let random_nft= valid_nft_list[Math.floor(Math.random() * valid_nft_list.length)];

                let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: random_nft.tokenUri } })
                let client_gateway = process.env.CLIENT_IPFS_ID || null
                let public_gateway = `ipfs.io`
                if (client_gateway) {
                    tokenUri.data.image = tokenUri.data.image.replace(public_gateway, client_gateway)
                    tokenUri.data.assets = tokenUri.data.assets.replace(public_gateway, client_gateway)
                }
                
                // // transfer to Owner
                try {
                    // await ContractController.transferFrom(WALLET_PUBLIC_KEY,owner,random_nft.tokenId)
                    extra_nft=tokenUri.data
                } catch (error) {
                    extra_nft=null
                }
            }

            randomItem.dataValues.quantity = rowData.quantity;
            return res.sendResponse({...randomItem.dataValues,extra_nft}, `Random item found for category ${rowData.category} with quality ${randomQuality}`, STATUS_CODES.OK);
        }
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
}
const purchaseItem = async(req, res, next) => {
    try {
        const { owner, id, quantity } = req.body;
        const currencyId = ["7dc748d5-de7d-4a76-9a58-62463ee7be14", "1a06543f-42c7-402f-a22a-32594b58c0e5"]; // 0 is gem, 1 is gold
        const rowData = req.body;
        const currency = rowData.currency;
        const userCurrencyBalance = await models.ItemAppOwner.findOne({ where: { id: currencyId[currency], owner: owner } });
        if (rowData.id === currencyId[0] && currencyId[currency] === currencyId[1]) {
            return res.sendResponse(null, 'Cannot use gold to purchase gem.', STATUS_CODES.NOT_FOUND);
        }
        // purchase gem
        if (rowData.id === currencyId[0] && currencyId[currency] === currencyId[0]) {
            const row = await models.ItemAppOwner.findOne({ where: { id: id, owner: owner } });
            if (row) {
                const updateData = {
                    id: id,
                    owner: owner,
                    quantity: row.quantity + rowData.quantity
                }
                await row.update(updateData);
                await row.reload();
                return res.sendResponse(row, `Purchase success (update)`, STATUS_CODES.OK);
            } else {
                const newRow = {
                    id: id,
                    owner: owner,
                    quantity: quantity
                }
                const result = await models.ItemAppOwner.create(newRow);
                return res.sendResponse(result, `Purchase success (create)`, STATUS_CODES.OK);
            }
        }
        const totalPrice = (currency == 0) ? rowData.gemcost * rowData.quantity : rowData.goldcost * rowData.quantity;
        console.log(userCurrencyBalance.quantity, totalPrice);
        if (userCurrencyBalance.quantity < totalPrice) {
            return res.sendResponse(null, 'Your balance is not sufficient for this item', STATUS_CODES.NOT_FOUND);
        } else {
            // Fetch the ItemApp details
            const itemApp = await models.ItemApp.findOne({ where: { id: id }});

            if (!itemApp) {
                return res.sendResponse(null, `Error fetching details for Item ID ${id}`, STATUS_CODES.INTERNAL_ERROR);
            }

            console.log("itemApp.dataValues: \n", itemApp.dataValues);

            // Update boost effect time
            if (itemApp.dataValues.category == "boost") {
                const newData = {
                    id: id,
                    owner: owner,
                    lastTimeBoost: new Date()
                };

                // Use upsert to insert or update the record
                const [upsertedRow, created] = await models.BoostEffect.upsert(newData);
                console.log("upsertedRow: ", upsertedRow, "created: ", created);

                const updateCurrencyData = {
                    id: currencyId[currency],
                    owner: owner,
                    quantity: userCurrencyBalance.quantity - totalPrice
                };

                await userCurrencyBalance.update(updateCurrencyData);
                await userCurrencyBalance.reload();

                // const results = await models.BoostEffect.findAll({ where: { owner: owner } });
                // console.log("results: ", results);

                if (created) {
                    return res.sendResponse(created, `Created new BoostEffect record successfully`, STATUS_CODES.OK);
                } 
                else if (upsertedRow) {
                    return res.sendResponse(upsertedRow, `Updated existing BoostEffect record successfully`, STATUS_CODES.OK);
                }
                else {
                    return res.sendResponse(null, `Unexpected error appear while purchase a boost item`, STATUS_CODES.BAD_REQUEST);
                }
            }
            else if (itemApp.dataValues.category === "energy") {// Update NFT energy
                const result = await models.OwnerEnergy.findOne({ where: { owner: owner } });
                console.log(result.dataValues);
                const currentEnergy = result.dataValues.energy;
                const updateEnergy = currentEnergy + quantity;
                let updatedTime = new Date(result.dataValues.remainingTime);
                updatedTime.setHours(updatedTime.getHours() - quantity);   
                const newRemainingTime = updateEnergy >= 3 ? null : updatedTime;
                console.log(currentEnergy, updateEnergy, result.dataValues.remainingTime, newRemainingTime);
                await result.update({ energy: updateEnergy, remainingTime: newRemainingTime });
                await result.reload();

                const updateCurrencyData = {
                    id: currencyId[currency],
                    owner: owner,
                    quantity: userCurrencyBalance.quantity - totalPrice
                };

                await userCurrencyBalance.update(updateCurrencyData);
                await userCurrencyBalance.reload();
                return res.sendResponse(result, `Used item ${itemApp.dataValues.name} for user ${owner} successfully.`, STATUS_CODES.OK);
            }
            else {
                const row = await models.ItemAppOwner.findOne({ where: { id: id, owner: owner } });
                if (row) {
                    const updateData = {
                        id: id,
                        owner: owner,
                        quantity: row.quantity + rowData.quantity
                    }
                    await row.update(updateData);
                    await row.reload();
                    const updateCurrencyData = {
                        id: currencyId[currency],
                        owner: owner,
                        quantity: userCurrencyBalance.quantity - totalPrice
                    }
                    await userCurrencyBalance.update(updateCurrencyData);
                    await userCurrencyBalance.reload();
                    console.log(updateCurrencyData.quantity);
                    return res.sendResponse(row, `Purchase success (update)`, STATUS_CODES.OK);
                } else {
                    const newRow = {
                        id: id,
                        owner: owner,
                        quantity: quantity
                    }
                    const result = await models.ItemAppOwner.create(newRow);
                    const updateCurrencyData = {
                        id: currencyId[currency],
                        owner: owner,
                        quantity: userCurrencyBalance.quantity - totalPrice
                    }
                    await userCurrencyBalance.update(updateCurrencyData);
                    await userCurrencyBalance.reload();
                    return res.sendResponse(result, `Purchase success (create)`, STATUS_CODES.OK);
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const add = async(req, res, next) => {
    try {
        const rowData = req.body;
        const row = await models.ItemAppOwner.findOne({ where: { id: rowData.id, owner: rowData.owner } });
        if (row) {
            return res.sendResponse(null, `User ${rowData.owner} already has Item ID ${rowData.id}`, STATUS_CODES.CONFLICT);
        } else {
            const newRow = await models.ItemAppOwner.create(rowData);
            return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK);
        }
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const updateById = async(req, res, next) => {
    try {
        const updateData = req.body;

        console.log("updateData: ", updateData.id);

        const row = await models.ItemAppOwner.findOne({ where: { id: updateData.id, owner: updateData.owner } });

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${updateData.id}`, STATUS_CODES.NOT_FOUND);
        } else {
            await row.update(updateData);
            await row.reload();

            return res.sendResponse(row, `Update ID ${updateData.id} Success`, STATUS_CODES.OK);
        }
    } catch (error) {
        return res.sendResponse(null, error.message || error, STATUS_CODES.INTERNAL_ERROR);
    }
};
const getOwnerCurrency = async(req, res, next) => {
    try {
        const { owner } = req.params;
        const currencyId = ["7dc748d5-de7d-4a76-9a58-62463ee7be14", "1a06543f-42c7-402f-a22a-32594b58c0e5"]; // 0 is gem, 1 is gold
        let results = await models.ItemAppOwner.findAll({
            where: {
                owner: owner,
                id: {
                    [Op.in]: currencyId
                }
            }
        });

        // Check for missing currencies and create them
        const missingIds = currencyId.filter(id => !results.find(result => result.id === id));
        if (missingIds.length > 0) {
            const newRecords = missingIds.map(id => ({
                id: id,
                owner: owner,
                quantity: 0
            }));
            await models.ItemAppOwner.bulkCreate(newRecords);

            // Fetch the newly created records
            const newResults = await models.ItemAppOwner.findAll({
                where: {
                    owner: owner,
                    id: {
                        [Op.in]: missingIds
                    }
                }
            });

            // Combine the new records with the existing results
            results = [...results, ...newResults];
        }

        // Initialize an array to hold detailed results
        const detailedResults = [];

        // Loop through the results array to get detailed information
        for (const result of results) {
            const detailedResult = await models.ItemApp.findOne({
                where: {
                    id: result.dataValues.id,
                    name: {
                        [Op.in]: ['Gem', 'Gold']
                    }
                }
            });

            if (detailedResult) {
                // Attach detailed information to the result
                result.dataValues.name = detailedResult.dataValues.name;
                result.dataValues.description = detailedResult.dataValues.description;
                result.dataValues.category = detailedResult.dataValues.category;
                result.dataValues.quality = detailedResult.dataValues.quality;
                result.dataValues.itemquantity = detailedResult.dataValues.quantity;
                result.dataValues.gemcost = detailedResult.dataValues.gemcost;
                result.dataValues.goldcost = detailedResult.dataValues.goldcost;
                result.dataValues.image = detailedResult.dataValues.image;

                // Push the detailed result to the array
                detailedResults.push(result);
            }
        }

        // Return the results with detailed information
        return res.sendResponse(detailedResults, `Get Owner ${owner} App Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
}


module.exports = {
    getAll,
    getById,
    purchaseItem,
    add,
    deleteById,
    updateById,
    getByOwner,
    getOwnerCurrency,
    useItemForOwner,
    purchaseItemPack,
    victoryReward
}