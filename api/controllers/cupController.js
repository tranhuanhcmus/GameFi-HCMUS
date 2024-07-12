const { STATUS_CODES } = require("../constants")
const models = require("../database/models")
const { Op, Sequelize } = require('sequelize');

const getCupSumByOwner = async(req, res, next) => {
    try {
        const { timePeriod } = req.params;
        let truncFunction;
        let groupByColumn;

        // Xác định hàm và cột nhóm tương ứng với thời gian
        switch (timePeriod) {
            case 'day':
                truncFunction = 'day';
                groupByColumn = Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt'));
                break;
            case 'week':
                truncFunction = 'week';
                groupByColumn = Sequelize.fn('date_trunc', 'week', Sequelize.col('createdAt'));
                break;
            case 'month':
                truncFunction = 'month';
                groupByColumn = Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt'));
                break;
            case 'year':
                truncFunction = 'year';
                groupByColumn = Sequelize.fn('date_trunc', 'year', Sequelize.col('createdAt'));
                break;
            default:
                truncFunction = 'year';
                groupByColumn = Sequelize.fn('date_trunc', 'year', Sequelize.col('createdAt'));
                break;
        }

        // Thực hiện truy vấn Sequelize
        const cupsByTimePeriod = await models.Cup.findAll({
            attributes: [
                'owner', [groupByColumn, 'date_period'],
                [Sequelize.fn('sum', Sequelize.col('cup')), 'total_cups']
            ],
            group: ['owner', groupByColumn],
            order: [
                [groupByColumn, 'DESC'], // Order by groupByColumn from newest to oldest
                [Sequelize.fn('sum', Sequelize.col('cup')), 'DESC'], // Order by total_cups in descending order
            ]
        });

        if (!cupsByTimePeriod || cupsByTimePeriod.length === 0) {
            return res.sendResponse(null, `Not Found Data in time period ${timePeriod}`, STATUS_CODES.NOT_FOUND);
        }
        return res.sendResponse(cupsByTimePeriod, `Sum of cups by owner for ${timePeriod}`, STATUS_CODES.OK);
    } catch (error) {
        console.error('Error in getCupSumByOwner:', error);
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
};
const getCupSumBySpecificOwner = async(req, res, next) => {
    try {
        const rowData = req.body;
        const { owner, timePeriod } = rowData;
        let truncFunction;
        let groupByColumn;

        // Xác định hàm và cột nhóm tương ứng với thời gian
        switch (timePeriod) {
            case 'day':
                truncFunction = 'day';
                groupByColumn = Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt'));
                break;
            case 'week':
                truncFunction = 'week';
                groupByColumn = Sequelize.fn('date_trunc', 'week', Sequelize.col('createdAt'));
                break;
            case 'month':
                truncFunction = 'month';
                groupByColumn = Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt'));
                break;
            case 'year':
                truncFunction = 'year';
                groupByColumn = Sequelize.fn('date_trunc', 'year', Sequelize.col('createdAt'));
                break;
            default:
                truncFunction = 'year';
                groupByColumn = Sequelize.fn('date_trunc', 'year', Sequelize.col('createdAt'));
                break;
        }

        const results = await models.Cup.findAll({
            attributes: [
                'owner', [groupByColumn, 'time_period'],
                [Sequelize.fn('SUM', Sequelize.col('cup')), 'total_cup']
            ],
            where: {
                owner: owner
            },
            group: ['owner', groupByColumn],
            order: [
                [groupByColumn, 'DESC'], // Order by groupByColumn from newest to oldest
                [Sequelize.fn('sum', Sequelize.col('cup')), 'DESC'], // Order by total_cups in descending order
            ]
        });
        if (!results) {
            return res.sendResponse(null, `Not Found Data for owner ${owner} in time period ${timePeriod}`, STATUS_CODES.NOT_FOUND);
        }
        return res.sendResponse(results, `Sum of cups by owner ${owner} for ${timePeriod}`, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
};
const upsertCup = async(req, res, next) => {
    try {
        const upsertData = req.body;
        const [result, created] = await models.Cup.upsert(upsertData);

        const message = created ? 'A new record has been created.' : 'The record has been updated.';
        return res.sendResponse(result, message, STATUS_CODES.OK);
    } catch (error) {
        return res.sendResponse(null, error.message, STATUS_CODES.INTERNAL_ERROR);
    }
};
const deleteById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const row = await models.Cup.findOne({ where: { id: id } });

        if (!row) {
            return res.sendResponse(
                null,
                `Not Found ID ${id} `,
                STATUS_CODES.NOT_FOUND
            );
        } else {
            await row.destroy();

            return res.sendResponse(null, `Delete ID ${id} success`, STATUS_CODES.OK);
        }
    } catch (error) {
        return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
    }
};

module.exports = {
    getCupSumByOwner,
    getCupSumBySpecificOwner,
    upsertCup,
    deleteById
};