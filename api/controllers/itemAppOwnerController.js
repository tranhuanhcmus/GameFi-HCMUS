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

        const groupedResults = {};

        // Iterate through the results array
        for (const result of results) {
            // Fetch detailed information for each ID
            const detailedResult = await models.ItemApp.findOne({ where: { id: result.dataValues.id } });

            // Check the result of the detailed fetch
            if (!detailedResult) {
                return res.sendResponse(null, `Error fetching details for ID ${result.dataValues.id}`, STATUS_CODES.INTERNAL_ERROR);
            }

            // Attach detailed information to the result
            result.dataValues.name = detailedResult.dataValues.name;
            result.dataValues.description = detailedResult.dataValues.description;
            result.dataValues.category = detailedResult.dataValues.category;
            result.dataValues.quality = detailedResult.dataValues.quality;
            result.dataValues.itemquantity = detailedResult.dataValues.quantity;
            result.dataValues.gemcost = detailedResult.dataValues.gemcost;
            result.dataValues.goldcost = detailedResult.dataValues.goldcost;
            result.dataValues.image = detailedResult.dataValues.image;

            // Group results by category
            const category = detailedResult.dataValues.category;
            if (!groupedResults[category]) {
                groupedResults[category] = [];
            }
            groupedResults[category].push(result.dataValues);
        }

        // Return the grouped results
        return res.sendResponse(groupedResults, `Get Owner ${owner} App Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR);
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
	getAll,getById,purchaseItem,add,deleteById,updateById,getByOwner,getOwnerCurrency
}