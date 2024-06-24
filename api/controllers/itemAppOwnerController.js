const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const { Op } = require('sequelize');

const getAll = async(req, res, next) => {
    try {
        const list = await models.ItemAppOwner.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.ItemAppOwner.findOne({ where: { id: id } })

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getByOwner = async (req, res, next) => {
    try {
        const { owner } = req.params;
        const results = await models.ItemAppOwner.findAll({ where: { owner: owner } });

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
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const useItemForOwner = async (req, res, next) => {
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
        // Update item quantity
        const updatedQuantity = itemOwner.dataValues.quantity - quantity;
        await itemOwner.update({ quantity: updatedQuantity });
        await itemOwner.reload();
        // Update NFT exp
        if (detailedResult.category === "food" && tokenId) {
            const nftResult = await models.NFT.findOne({ where: { tokenId: tokenId } })
            // console.log(result.dataValues.tokenUri);
            if (!nftResult) {
                return res.sendResponse(null, `Error fetching NFT details for ID ${tokenId}`, STATUS_CODES.INTERNAL_ERROR);
            }

            const currentEnergy = nftResult.exp;
            let exp = currentEnergy + detailedResult.totalpoint;

            var updateData = nftResult;
            updateData.exp = exp;

            await nftResult.update(updateData)
            await nftResult.reload()
        }
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
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const purchaseItem = async (req, res, next) => {
    try {
        const currencyId = ["7dc748d5-de7d-4a76-9a58-62463ee7be14", "1a06543f-42c7-402f-a22a-32594b58c0e5"];    // 0 is gem, 1 is gold
        const rowData = req.body;
        const currency = rowData.currency;
        const userCurrencyBalance = await models.ItemAppOwner.findOne({ where: { id: currencyId[currency], owner: rowData.owner } });
        if(rowData.id === currencyId[0] || rowData.id === currencyId[1]) {
            return res.sendResponse(null, 'Cannot use one currency to purchase itself or another', STATUS_CODES.NOT_FOUND);
        }
        const totalPrice = (currency == 0) ? rowData.gemcost * rowData.quantity : rowData.goldcost * rowData.quantity;
        console.log(userCurrencyBalance.quantity, totalPrice);
        if (userCurrencyBalance.quantity < totalPrice){
            return res.sendResponse(null, 'Your balance is not sufficient for this item', STATUS_CODES.NOT_FOUND);
        }
        else{
            const row = await models.ItemAppOwner.findOne({ where: { id: rowData.id, owner: rowData.owner } });
            if (row) {
                const updateData = {
                    id: rowData.id,
                    owner: rowData.owner,
                    quantity: row.quantity + rowData.quantity
                }
                await row.update(updateData);
                await row.reload();
                const updateCurrencyData = {
                    id: currencyId[currency],
                    owner: rowData.owner,
                    quantity: userCurrencyBalance.quantity - totalPrice
                }
                await userCurrencyBalance.update(updateCurrencyData);
                await userCurrencyBalance.reload();
                console.log(updateCurrencyData.quantity);
                return res.sendResponse(row, `Purchase success (update)`, STATUS_CODES.OK);
            } else {
                const newRow = {
                    id: rowData.id,
                    owner: rowData.owner,
                    quantity: rowData.quantity
                }
                const result = await models.ItemAppOwner.create(rowData);
                const updateCurrencyData = {
                    id: currencyId[currency],
                    owner: rowData.owner,
                    quantity: userCurrencyBalance.quantity - totalPrice
                }
                await userCurrencyBalance.update(updateCurrencyData);
                await userCurrencyBalance.reload();
                return res.sendResponse(result, `Purchase success (create)`, STATUS_CODES.OK);
            }
        }
    } catch (error) {
        console.log(error);
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const add = async (req, res, next) => {
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
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const updateById = async (req, res, next) => {
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
const getOwnerCurrency = async (req, res, next) => {
    try {
        const { owner } = req.params;
        const results = await models.ItemAppOwner.findAll({
            where: {
                owner: owner
            }
        });

        if (!results || results.length === 0) {
            return res.sendResponse(null, `Not Found Owner ${owner}`, STATUS_CODES.NOT_FOUND);
        }

        // Initialize an array to hold filtered detailed results
        const detailedResults = [];

        // Loop through the results array
        for (const result of results) {
            // Get detailed information for each id with an OR condition on the name field
            const detailedResult = await models.ItemApp.findOne({
                where: {
                    id: result.dataValues.id,
                    [Op.or]: [
                        { name: 'Gem' },
                        { name: 'Gold' }
                    ]
                }
            });
            
            // Check the result from getById and handle the response
            if (!detailedResult) {
                // If not found or there's an error, continue to the next result
                continue;
            }

            // If successful, attach the detailed information to the result
            result.dataValues.name = detailedResult.dataValues.name;
            result.dataValues.description = detailedResult.dataValues.description;
            result.dataValues.category = detailedResult.dataValues.category;
            result.dataValues.quality = detailedResult.dataValues.quality;
            result.dataValues.itemquantity = detailedResult.dataValues.quantity;
            result.dataValues.gemcost = detailedResult.dataValues.gemcost;
            result.dataValues.goldcost = detailedResult.dataValues.goldcost;
            result.dataValues.image = detailedResult.dataValues.image;

            // Push the detailed result to the filtered array
            detailedResults.push(result);
        }

        if (detailedResults.length === 0) {
            return res.sendResponse(null, `No items found for owner ${owner} with names 'Gem' or 'Gold'`, STATUS_CODES.NOT_FOUND);
        }

        // Return the results with mapped detailed information
        return res.sendResponse(detailedResults, `Get Owner ${owner} App Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

module.exports={
	getAll,getById,purchaseItem,add,deleteById,updateById,getByOwner,getOwnerCurrency,useItemForOwner
}