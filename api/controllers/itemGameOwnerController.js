const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {
        const list = await models.ItemGameOwner.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.ItemGameOwner.findOne({ where: { id: id } })

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
        const results = await models.ItemGameOwner.findAll({ where: { owner: owner } });

        if (!results || results.length === 0) {
            return res.sendResponse(null, `Not Found Owner ${owner}`, STATUS_CODES.NOT_FOUND);
        }

        // Lặp qua mảng kết quả
        for (const result of results) {
            // console.log(result.dataValues.id);
            // Gọi hàm getById để lấy thông tin chi tiết của mỗi id
            const detailedResult = await models.ItemGame.findOne({ where: { id: result.dataValues.id } })
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
        return res.sendResponse(results, `Get Owner ${owner} Game Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const useItemForOwner = async (req, res, next) => {
    try {
        const { owner, id, quantity } = req.body;

        // Fetch the ItemGameOwner entry
        const itemOwner = await models.ItemGameOwner.findOne({ where: { id, owner } });

        if (!itemOwner) {
            return res.sendResponse(null, `Owner ${owner} does not own the selected item.`, STATUS_CODES.NOT_FOUND);
        }

        if (quantity > itemOwner.dataValues.quantity) {
            return res.sendResponse(null, `Owner ${owner} does not have enough of the selected item.`, STATUS_CODES.NOT_FOUND);
        }

        // Fetch the ItemGame details
        const itemGame = await models.ItemGame.findOne({ where: { id } });

        if (!itemGame) {
            return res.sendResponse(null, `Error fetching details for Item ID ${id}`, STATUS_CODES.INTERNAL_ERROR);
        }

        // Map detailed item data
        const detailedResult = {
            ...itemOwner.dataValues,
            name: itemGame.dataValues.name,
            description: itemGame.dataValues.description,
            category: itemGame.dataValues.category,
            quality: itemGame.dataValues.quality,
            itemquantity: itemGame.dataValues.quantity,
            gemcost: itemGame.dataValues.gemcost,
            goldcost: itemGame.dataValues.goldcost,
            image: itemGame.dataValues.image,
            totalpoint: quantity * itemGame.dataValues.quantity
        };
        console.log("detailedResult: \n", detailedResult);
        // Update item quantity
        const updatedQuantity = itemOwner.dataValues.quantity - quantity;
        await itemOwner.update({ quantity: updatedQuantity });
        await itemOwner.reload();

        // Prepare and return the response
        return res.sendResponse(detailedResult, `Used item ${itemGame.dataValues.name} for user ${owner} successfully.`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message || error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.ItemGameOwner.findOne({ where: { id: id } })

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
            const row = await models.ItemGameOwner.findOne({ where: { id: rowData.id, owner: rowData.owner } });
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
                const result = await models.ItemGameOwner.create(rowData);
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
        const row = await models.ItemGameOwner.findOne({ where: { id: rowData.id, owner: rowData.owner } });
        if (row) {
            return res.sendResponse(null, `User ${rowData.owner} already has Item ID ${rowData.id}`, STATUS_CODES.CONFLICT);
        } else {
            const newRow = await models.ItemGameOwner.create(rowData);
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
        
        const row = await models.ItemGameOwner.findOne({ where: { id: updateData.id, owner: updateData.owner } });
        
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


module.exports={
	getAll,getById,purchaseItem,add,deleteById,updateById,getByOwner,useItemForOwner
}