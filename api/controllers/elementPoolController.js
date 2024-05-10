const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {
        const list = await models.ElementPool.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.ElementPool.findOne({ where: { id: id } })

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id}  Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.ElementPool.findOne({ where: { id: id } })

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
        let formData = { ...req.body, image: '/uploads/'+req.body?.imageName};
        const newRow = await models.ElementPool.create(formData)

        return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK)


    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const updateById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.ElementPool.findOne({ where: { id: id } })

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        } else {
            const updateData = req.body
            await row.update(updateData)
            await row.reload()

            return res.sendResponse(row, `Update ID ${id}  Success`, STATUS_CODES.OK)
        }

    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}

module.exports={
	getAll,getById,add,deleteById,updateById
}