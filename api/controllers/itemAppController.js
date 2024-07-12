const { STATUS_CODES, SHOP_CATEGORY } = require("../constants");
const models = require("../database/models");
const getAll = async (req, res, next) => {
  try {
    const list = await models.ItemApp.findAll();

    if (!list || list.length === 0) {
      return res.sendResponse(null, "No items found", STATUS_CODES.NOT_FOUND);
    }

    // Group results by category
    const groupedResults = list.reduce((acc, item) => {
      const category = item.dataValues.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item.dataValues);
      return acc;
    }, {});

    if(req.query.category=='shop'){
      for (const key in groupedResults) {
        if(!SHOP_CATEGORY.includes(key.toLowerCase()))
          delete groupedResults[key]
      }
    }

    return res.sendResponse(groupedResults, "Get All Success", STATUS_CODES.OK);
  } catch (error) {
    return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await models.ItemApp.findOne({ where: { id: id } });

    if (!result) {
      return res.sendResponse(
        null,
        `Not Found ID ${id} `,
        STATUS_CODES.NOT_FOUND
      );
    }

    return res.sendResponse(result, `Get ID ${id} Success`, STATUS_CODES.OK);
  } catch (error) {
    return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const row = await models.ItemApp.findOne({ where: { id: id } });

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

const add = async (req, res, next) => {
  try {
    const itemQuality = ["normal", "rare", "super rare"];
    const qualityValues = [10, 20, 50];

    // Kiểm tra và chuyển đổi giá trị quality từ req.body
    const qualityIndex = itemQuality.indexOf(req.body.quality);
    const qualityValue = qualityIndex !== -1 ? qualityValues[qualityIndex] : null;

    if (qualityValue === null) {
      return res.sendResponse(null, 'Invalid quality value', STATUS_CODES.BAD_REQUEST);
    }

    let formData = { 
      ...req.body, 
      image: '/uploads/' + req.body?.imageName,
      quantity: qualityValue
    };

    const newRow = await models.ItemApp.create(formData);

    return res.sendResponse(newRow, `Add success`, STATUS_CODES.OK);
  } catch (error) {
    return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
  }
};
const updateById = async (req, res, next) => {
  try {
    const updateData = req.body;
    const id = updateData.id;
    const row = await models.ItemApp.findOne({ where: { id: id } });

    if (!row) {
      return res.sendResponse(
        null,
        `Not Found ID ${id} `,
        STATUS_CODES.NOT_FOUND
      );
    } else {
      await row.update(updateData);
      await row.reload();

      return res.sendResponse(row, `Update ID ${id} Success`, STATUS_CODES.OK);
    }
  } catch (error) {
    return res.sendResponse(error, error, STATUS_CODES.INTERNAL_ERROR);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
};
