const { tokenUriController } = require(".")
const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const getAll = async(req, res, next) => {
    try {
        const list = await models.NFT.findAll()

        return res.sendResponse(list, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getById = async(req, res, next) => {
    try {

        const { id } = req.params
        const result = await models.NFT.findOne({ where: { tokenId: id } })

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id}  Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const getALlByOwner = async(req, res, next) => {
    try {

        const { owner } = req.params
        const rows = await models.NFT.findAll({ where: { owner: owner } })


        let result=[]

        for (let i = 0; i < rows.length; i++) {
            let uri = rows[i].tokenUri;

            let tokenUri= await models.TokenUri.findOne({where:{tokenUri:uri}})

            result.push({
                         tokenId: rows[i].tokenId,
                         tokenUri: rows[i].tokenUri,
                         owner: rows[i].owner,
                         exp: rows[i].exp,
                         data: tokenUri.data 
                     });
          }

        return res.sendResponse(result, `Get by Owner ${owner}  Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const deleteById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.NFT.findOne({ where: { tokenId: id } })

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

        const newRow = await models.NFT.create(req.body)

        return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK)


    } catch (error) {
        return res.sendResponse(null, error, STATUS_CODES.INTERNAL_ERROR)
    }
}
const updateById = async(req, res, next) => {
    try {

        const { id } = req.params
        const row = await models.NFT.findOne({ where: { tokenId: id } })

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
	getAll,getById,add,deleteById,updateById,getALlByOwner
}