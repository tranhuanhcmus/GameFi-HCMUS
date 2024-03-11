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

const getTokenURI = async (req, res) => {
  const { tokenURI } = req.body;
  console.log(tokenURI);
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

module.exports = {
  userNFTs,
  getTokenURI,
  createTokenURI,
  updateTokenURI,

};
