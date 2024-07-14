const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {
        const list = await models.Hangman.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.Hangman.findOne({ where: { id: id } })
        console.log("result: ", result);
        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.Hangman.findOne({ where: { id: id } })

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

const add = async(req, res, next) => {
    try {
        const data = req.body
        const row = await models.Hangman.findOne({ where: { question: data.question } })
        if (row) {
            return res.sendResponse(null, `Question "${data.question}" already exists in the database`, STATUS_CODES.BAD_REQUEST)
        } else {
            const newRow = await models.Hangman.create(req.body)

            return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK)
        }


    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const updateById = async(req, res, next) => {
    try {

        const updateData = req.body;
        const id = updateData.id;
        const row = await models.Hangman.findOne({ where: { id: id } })

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        } else {
            await row.update(updateData)
            await row.reload()

            return res.sendResponse(row, `Update ID ${id} Success`, STATUS_CODES.OK)
        }

    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById
}