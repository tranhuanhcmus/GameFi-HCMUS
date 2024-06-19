const { Sequelize, Op } = require("sequelize");
const { STATUS_CODES, ITEM_CATEGORY } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {

        let category_filter = {};
        let quality_filter = {};

        if (req.query && req.query.category) {
            switch (req.query.category) {
                case 'shop':
                    category_filter = { category: {
                            [Op.in]: ITEM_CATEGORY } };
                    break;
                case 'boost':
                    category_filter = { category: 'boost' };
                    break;
                case 'food':
                    category_filter = { category: 'food' };
                    break;
                case 'treasure':
                    category_filter = { category: 'treasure' };
                    break;
                case 'energy':
                    category_filter = { category: 'energy' };
                    break;
                default:
                    // Handle unknown category, if needed
                    break;
            }
        }
        if (req.query && req.query.quality) {
            switch (req.query.quality) {
                case 'normal':
                    quality_filter = { quality: 'normal' };
                    break;
                case 'rare':
                    quality_filter = { quality: 'rare' };
                    break;
                case 'super rare':
                    quality_filter = { quality: 'super rare' };
                    break;
                
                default:
                    // Handle unknown quality, if needed
                    break;
            }
        }

        let checkFilter = req.query ? true : false

        const whereClause = { where: {...category_filter,...quality_filter } };

        const list = await models.ItemGame.findAll(whereClause)

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.ItemGame.findOne({ where: { id: id } })

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.ItemGame.findOne({ where: { id: id } })

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

const add = async(req, res, next) => {
    try {
        let formData = {...req.body, image: '/uploads/' + req.body.imageName };
        const newRow = await models.ItemGame.create(formData)

        return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK)


    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const updateById = async(req, res, next) => {
    try {

        const updateData = req.body;
        const id = updateData.id;
        const row = await models.ItemGame.findOne({ where: { id: id } })

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        } else {
            await row.update(updateData)
            await row.reload()

            return res.sendResponse(row, `Update ID ${id} Success`, STATUS_CODES.OK)
        }

    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById
}