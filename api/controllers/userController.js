const userPromises = require('../promises/userPromises.js');

const login = async (req, res) => {
  const { userTel, userPass } = req.body;

  // Check if userTel is empty
  if (!userTel) {
    return res.status(400).json({ error: 'Số điện thoại không được bỏ trống.' });
  } else if (isNaN(userTel) || userTel.includes(' ')) {
    // Check if userTel is invalid
    return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' });
  }

  try {
    const result = await userPromises.callAuthenticateUser(userTel, userPass);
    return res.status(200).json({ result: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực người dùng.' });
  }
};

const userInfor = async (req, res) => {
  const userAcc = req.params.user_acc;
  console.log(userAcc);
  try {
    const user = await userPromises.callGetUser(userAcc);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng.' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
  }
};

const userAdd = async (req, res) => {
  const { userMail, userTel, userPass, userName, userAva, userAcc } = req.body;

  try {
    const result = await userPromises.callAddUser(userMail, userTel, userPass, userName, userAva, userAcc);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm user.' });
  }
};

const userInforUpdate = async (req, res) => {
  const { userMail, userTel, userPass, userName, userAva, userAcc } = req.body;

  try {
    const result = await userPromises.callUpdateUser(userMail, userTel, userPass, userName, userAva, userAcc);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
  }
};

module.exports = {
  login,
  userInfor,
  userAdd,
  userInforUpdate,
};
