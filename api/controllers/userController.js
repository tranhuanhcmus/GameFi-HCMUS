const userServices = require('../services/userServices.js');

const userNFTs = async (req, res) => {
  const { owner } = req.params;
  console.log("owner: ", owner);
  try {
    const user = await userServices.getNFTbyOwner(owner);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng.' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
  }
};

const updateNFTOwner = async (req, res) => {
  const { tokenid, to } = req.body;
  console.log(tokenid, to);
  try {
    const result = await userServices.updateNFTOwner(tokenid, to);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật NFT Owner.' });
  }
};

const updateNFTExp = async (req, res) => {
  const { tokenid, exp } = req.body;
  console.log(tokenid, exp);
  try {
    const result = await userServices.updateNFTExp(tokenid, exp);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật NFT Owner.' });
  }
};

const getAllTokenURI = async (req, res) => {
  try {
    const user = await userServices.getAllTokenURIData();
    // console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin Token URI.' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin Token URI.' });
  }
};

const getTokenURI = async (req, res) => {
  const { tokenURI } = req.body;
  console.log("tokenURI: ", tokenURI);
  try {
    const user = await userServices.getTokenURIData(tokenURI);
    // console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin Token URI.' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin Token URI.' });
  }
};

const createTokenURI = async (req, res) => {
  const { tokenURI } = req.body;
  console.log(tokenURI);
  try {
    const result = await userServices.createTokenURI(tokenURI);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm TokenURI.' });
  }
};

const updateTokenURI = async (req, res) => {
  const { tokenURI } = req.body;
  console.log(tokenURI);
  try {
    const result = await userServices.updateTokenURI(tokenURI);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật TokenURI.' });
  }
};

const getItemGame = async (req, res) => {
  try {
    const result = await userServices.getItemGame();
    console.log(`Lấy thông tin ItemGame thành công: `, result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lấy thông tin ItemGame không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGame.' }); // Trả về lỗi cho client
  }
};

const getItemGameById = async (req, res) => {
  const { itemId } = req.params;
  console.log("itemId: ", itemId);
  try {
    const result = await userServices.getItemGameById(itemId);
    console.log(`Lấy thông tin ItemGame ${itemId} thành công: `, result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lấy thông tin ItemGame không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGame.' }); // Trả về lỗi cho client
  }
};

const getItemApp = async (req, res) => {
  try {
    const result = await userServices.getItemApp();
    console.log(`Lấy thông tin ItemApp thành công: `, result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lấy thông tin ItemApp không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemApp.' }); // Trả về lỗi cho client
  }
};

const getItemAppById = async (req, res) => {
  const { itemId } = req.params;
  console.log("itemId: ", itemId);
  try {
    const result = await userServices.getItemAppById(itemId);
    console.log(`Lấy thông tin ItemApp ${itemId} thành công: `, result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lấy thông tin ItemApp không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemApp.' }); // Trả về lỗi cho client
  }
};

const createItemGame = async (req, res) => {
  const { name, description, category, quality, gemcost, goldcost, HP, attack, def, duration } = req.body;
  try {
    const result = await userServices.createItemGame(name, description, category, quality, gemcost, goldcost, HP, attack, def, duration);
    console.log('Tạo mới ItemGame thành công:', result);
    return res.status(201).json(result); // Trả về kết quả cho client và HTTP status code 201 (Created)
  } catch (error) {
    console.log('Lỗi khi tạo mới ItemGame:', error.message);
    return res.status(500).json({ error: 'Lỗi khi tạo mới ItemGame.' }); // Trả về lỗi cho client
  }
};

const createItemApp = async (req, res) => {
  const { name, description, category, quality, gemcost, goldcost } = req.body;
  try {
    const result = await userServices.createItemApp(name, description, category, quality, gemcost, goldcost);
    console.log('Tạo mới ItemApp thành công:', result);
    return res.status(201).json(result); // Trả về kết quả cho client và HTTP status code 201 (Created)
  } catch (error) {
    console.log('Lỗi khi tạo mới ItemApp:', error.message);
    return res.status(500).json({ error: 'Lỗi khi tạo mới ItemApp.' }); // Trả về lỗi cho client
  }
};

const updateItemGame = async (req, res) => {
  const {itemId, name, description, category, quality, gemcost, goldcost, HP, attack, def, duration} = req.body;
  try {
    const result = await userServices.updateItemGame(itemId, name, description, category, quality, gemcost, goldcost, HP, attack, def, duration);
    console.log('Cập nhật thông tin ItemGame thành công:', result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lỗi khi cập nhật thông tin ItemGame:', error.message);
    return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemGame.' }); // Trả về lỗi cho client
  }
};

const updateItemApp = async (req, res) => {
  const {itemId, name, description, category, quality, gemcost, goldcost} = req.body;
  try {
    const result = await userServices.updateItemApp(itemId, name, description, category, quality, gemcost, goldcost);
    console.log('Cập nhật thông tin ItemApp thành công:', result);
    return res.json(result); // Trả về kết quả cho client
  } catch (error) {
    console.log('Lỗi khi cập nhật thông tin ItemApp:', error.message);
    return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemApp.' }); // Trả về lỗi cho client
  }
};

const getItemGameOwnership = async (req, res) => {
  const { owner } = req.params;
  console.log("owner: ", owner);
  try {
    const result = await userServices.getItemGameOwnership(owner);
    console.log(`Lấy thông tin ItemGameOwnership của người sở hữu ${owner} thành công: `, result);
    return res.json(result);
  } catch (error) {
    console.log('Lấy thông tin ItemGameOwnership không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemGameOwnership.' });
  }
};

const getItemAppOwnership = async (req, res) => {
  const { owner } = req.params;
  console.log("owner: ", owner);
  try {
    const result = await userServices.getItemAppOwnership(owner);
    console.log(`Lấy thông tin ItemAppOwnership của cho người sở hữu ${owner} thành công: `, result);
    return res.json(result);
  } catch (error) {
    console.log('Lấy thông tin ItemAppOwnership không thành công:', error.message);
    return res.status(500).json({ error: 'Lỗi khi lấy thông tin ItemAppOwnership.' });
  }
};

const createItemGameOwnership = async (req, res) => {
  const { itemId, owner, quantity } = req.body;
  try {
    const result = await userServices.createItemGameOwnership(itemId, owner, quantity);
    console.log('Tạo mới ItemGameOwnership thành công:', result);
    return res.json(result);
  } catch (error) {
    console.log('Lỗi khi tạo mới ItemGameOwnership:', error.message);
    return res.status(500).json({ error: 'Lỗi khi tạo mới ItemGameOwnership.'});
  }
};

const createItemAppOwnership = async (req, res) => {
  const { itemId, owner, quantity } = req.body;
  try {
    const result = await userServices.createItemAppOwnership(itemId, owner, quantity);
    console.log('Tạo mới ItemAppOwnership thành công:', result);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi khi tạo mới ItemAppOwnership.'});
  }
};

const updateItemGameOwnership = async (req, res) => {
  const { itemId, owner, quantity } = req.body;
  try {
    const result = await userServices.updateItemGameOwnership(itemId, owner, quantity);
    console.log('Cập nhật thông tin ItemGameOwnership thành công:', result);
    return res.json(result);
  } catch (error) {
    console.log('Lỗi khi cập nhật thông tin ItemGameOwnership:', error.message);
    return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemGameOwnership.' });
  }
};

const updateItemAppOwnership = async (req, res) => {
  const { itemId, owner, quantity } = req.body;
  try {
    const result = await userServices.updateItemAppOwnership(itemId, owner, quantity);
    console.log('Cập nhật thông tin ItemAppOwnership thành công:', result);
    return res.json(result);
  } catch (error) {
    console.log('Lỗi khi cập nhật thông tin ItemAppOwnership:', error.message);
    return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin ItemAppOwnership.' });
  }
};

module.exports = {
  userNFTs,
  updateNFTOwner,
  updateNFTExp,
  getAllTokenURI,
  getTokenURI,
  createTokenURI,
  updateTokenURI,
  getItemGame,
  getItemGameById,
  getItemApp,
  getItemAppById,
  createItemGame,
  createItemApp,
  updateItemGame,
  updateItemApp,
  getItemGameOwnership,
  getItemAppOwnership,
  createItemGameOwnership,
  createItemAppOwnership,
  updateItemGameOwnership,
  updateItemAppOwnership
};
