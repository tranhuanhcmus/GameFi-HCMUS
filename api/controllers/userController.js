const userServices = require('../services/userServices.js');

const userNFTs = async (req, res) => {
  const owner = req.params.owner;
  console.log(owner);
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

// const userAdd = async (req, res) => {
//   const { userMail, userTel, userPass, userName, userAva, userAcc } = req.body;

//   try {
//     const result = await userServices.addUser(userMail, userTel, userPass, userName, userAva, userAcc);
//     return res.status(200).json({ message: result.message });
//   } catch (error) {
//     return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm user.' });
//   }
// };

// const userInforUpdate = async (req, res) => {
//   const { userMail, userTel, userPass, userName, userAva, userAcc } = req.body;

//   try {
//     const result = await userServices.updateUser(userMail, userTel, userPass, userName, userAva, userAcc);
//     return res.status(200).json({ message: result.message });
//   } catch (error) {
//     return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
//   }
// };

module.exports = {
  userNFTs,
};
