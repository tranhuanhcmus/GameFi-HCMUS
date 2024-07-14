const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {
        const list = await models.BoostEffect.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.BoostEffect.findOne({ where: { id: id } })

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
        const results = await models.BoostEffect.findAll({ where: { owner: owner } });

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
            const detailedNFT = await models.NFT.findOne({ where: { tokenId: result.dataValues.tokenId } })
            if (!detailedNFT) {
                // Nếu không tìm thấy hoặc có lỗi, trả về lỗi tương ứng
                return res.sendResponse(null, `Error fetching details for Token Id ${result.dataValues.tokenId}`, detailedResult ? detailedResult.status : STATUS_CODES.INTERNAL_ERROR);
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
            result.dataValues.tokenUri = detailedNFT.dataValues.tokenUri;
            result.dataValues.exp = detailedNFT.dataValues.exp;
            result.dataValues.lastTimePlayed = detailedNFT.dataValues.lastTimePlayed;
            result.dataValues.energy = detailedNFT.dataValues.energy;

            console.log(result);
        }

        // Trả về kết quả đã được mapping thông tin chi tiết
        return res.sendResponse(results, `Get Owner ${owner} Game Items Success`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.BoostEffect.findOne({ where: { id: id } })

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
const addOrUpdate = async(req, res, next) => {
    try {
        const rowData = req.body;
        const { id, tokenId, owner } = rowData;

        // Check if the item game exists and validate its category
        const itemGame = await models.ItemGame.findOne({ where: { id } });
        if (!itemGame) {
            return res.sendResponse(null, `Not Found Item Game ID ${id}`, STATUS_CODES.NOT_FOUND);
        }
        const category = itemGame.dataValues.category;
        if (category.toLowerCase() !== "boost") {
            return res.sendResponse(null, `Invalid item: Current item category (${category}) is not a boost item.`, STATUS_CODES.BAD_REQUEST);
        }

        // Check if the boost effect already exists
        const existingRow = await models.BoostEffect.findOne({ where: { id, tokenId, owner } });
        if (existingRow) {
            await existingRow.update(rowData);
            await existingRow.reload();
            return res.sendResponse(existingRow, `Update success for Item ID ${id}`, STATUS_CODES.OK);
        } else {
            rowData.lastTimeBoost = new Date();
            const newRow = await models.BoostEffect.create(rowData);
            return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK);
        }
    } catch (error) {
        return res.sendResponse(null, error.message || error, STATUS_CODES.INTERNAL_ERROR);
    }
};

const updateById = async(req, res, next) => {
    try {
        const updateData = req.body;

        console.log("updateData: ", updateData.id);

        const row = await models.BoostEffect.findOne({ where: { id: updateData.id, tokenId: updateData.tokenId, owner: updateData.owner } });

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


module.exports = {
    getAll,
    getById,
    addOrUpdate,
    deleteById,
    updateById,
    getByOwner
}