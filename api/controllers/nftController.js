const { tokenUriController } = require(".")
const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const { getInfoFromTokenURI } = require("./ContractController")
require('dotenv').config()
const getAll = async(req, res, next) => {
    try {
        const rows = await models.NFT.findAll()


        let result = []

        for (let i = 0; i < rows.length; i++) {
            let uri = rows[i].tokenUri;

            let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: uri } })

            let client_gateway = process.env.CLIENT_IPFS_ID || null
            let public_gateway = `ipfs.io`
            if (client_gateway) {
                tokenUri.data.image = tokenUri.data.image.replace(public_gateway, client_gateway)
                tokenUri.data.assets = tokenUri.data.assets.replace(public_gateway, client_gateway)
            }

            if (tokenUri) {
                result.push({
                    tokenId: rows[i].tokenId,
                    tokenUri: rows[i].tokenUri,
                    owner: rows[i].owner,
                    exp: rows[i].exp,
                    lastTimePlayed: rows[i].lastTimePlayed,
                    energy: rows[i].energy,
                    data: tokenUri.data
                });
            }
        }

        return res.sendResponse(result, "Get All Success", STATUS_CODES.OK)
    } catch (error) {
        console.log(error);
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getById = async(req, res, next) => {
    try {
        const { id } = req.params
        const result = await models.NFT.findOne({ where: { tokenId: id } })
        let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: result.tokenUri } })

        let client_gateway = process.env.CLIENT_IPFS_ID || null
        let public_gateway = `ipfs.io`
        if (client_gateway) {
            tokenUri.data.image = tokenUri.data.image.replace(public_gateway, client_gateway)
            tokenUri.data.assets = tokenUri.data.assets.replace(public_gateway, client_gateway)
        }

        result.dataValues.data = tokenUri.data

        if (!result) {
            return res.sendResponse(null, `Not Found ID ${id} `, STATUS_CODES.NOT_FOUND)
        }

        return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const getALlByOwner = async(req, res, next) => {
    try {

        const { owner } = req.params
        const rows = await models.NFT.findAll({ where: { owner: owner } })

        let result = []

        for (let i = 0; i < rows.length; i++) {
            let uri = rows[i].tokenUri;

            let tokenUri = await models.TokenUri.findOne({ where: { tokenUri: uri } })
            if (tokenUri) {
                let client_gateway = process.env.CLIENT_IPFS_ID || null
                let public_gateway = `ipfs.io`
                if (client_gateway) {
                    tokenUri.data.image = tokenUri.data.image.replace(public_gateway, client_gateway)
                    tokenUri.data.assets = tokenUri.data.assets.replace(public_gateway, client_gateway)
                    rows[i].tokenUri = rows[i].tokenUri.replace(public_gateway, client_gateway)
                }
                result.push({
                    tokenId: rows[i].tokenId,
                    tokenUri: rows[i].tokenUri,
                    owner: rows[i].owner,
                    exp: rows[i].exp,
                    lastTimePlayed: rows[i].lastTimePlayed,
                    energy: rows[i].energy,
                    data: tokenUri.data
                });
            }
        }

        return res.sendResponse(result, `Get by Owner ${owner} Success`, STATUS_CODES.OK)
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
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
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}

const add = async(req, res, next) => {
    try {
        var newRowData = req.body
        const tokenId = newRowData.tokenId;

        const row = await models.NFT.findOne({ where: { tokenId: tokenId } })

        if (row) {
            return res.sendResponse(null, `Token Id ${tokenId} already exists in the database`, STATUS_CODES.BAD_REQUEST)
        } else {
            newRowData.lastTimePlayed = new Date()
            const newRow = await models.NFT.create(newRowData)

            return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK)
        }
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}
const updateById = async(req, res, next) => {
    try {
        var updateData = req.body;
        const tokenId = updateData.tokenId;
        console.log(tokenId)
        const row = await models.NFT.findOne({ where: { tokenId: tokenId } })

        if (!row) {
            return res.sendResponse(null, `Not Found ID ${tokenId} `, STATUS_CODES.NOT_FOUND)
        } else {
            updateData.lastTimePlayed = new Date()
            await row.update(updateData)
            await row.reload()

            return res.sendResponse(row, `Update ID ${tokenId} Success`, STATUS_CODES.OK)
        }

    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
}

const migrate = async(req, res, next) => {
    const { migrateData } = req.body
        //validate 
    if (!migrateData) {
        return res.sendResponse(null, 'Invalid params', STATUS_CODES.BAD_REQUEST)
    }

    let result = []

    if (migrateData.length > 0) {
        for (let nft of migrateData) {
            let { tokenId, tokenUri, owner } = nft
            if (!tokenId || !tokenUri || !owner) {
                result.push(`error with data nft: ${nft}`)
                continue
            }
            const row = await models.NFT.findOne({ where: { tokenId: tokenId, tokenUri: tokenUri } })
            if (row) {
                result.push(`existed NFT: ${nft}`)
                continue
            }

            try {
                let new_NFT = {
                        tokenId,
                        tokenUri,
                        owner
                    }
                    //create NFT
                let newRow = await models.NFT.create(new_NFT)
                    //get NFT json
                let json_data = await getInfoFromTokenURI(newRow.tokenUri)
                    // create TokenURI
                let newTokenUri = await models.TokenUri.create({
                    tokenUri: newRow.tokenUri,
                    data: json_data
                })
            } catch (error) {
                result.push(`error NFT:${nft},${error}`)
                continue
            }

        }
    }

    return res.sendResponse(result, "Migrate success", STATUS_CODES.OK)
}


module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    getALlByOwner,
    migrate
}