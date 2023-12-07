const userPromises = require('../promises/userPromises.js');

const login = async(req, res) => {
    const { userTel, userPass } = req.body;
    // Kiểm tra userTel có rỗng không
    if (!userTel) {
      return res.status(400).json({ error: 'Số điện thoại không được bỏ trống.' });
    }
    // Kiểm tra userTel có khoảng trắng hay có kí tự đb không
    else if (isNaN(userTel) || userTel.includes(' ')) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' });
    }
    try {
        const result = await userPromises.callAuthenticateUser(userTel, userPass);
        return res.status(200).json({ result: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực người dùng.' });
    }
};

const userInfor = async(req, res) => {
    const userTel = req.params.user_mail;
    // console.log(userTel);
    try {
      const user = await userPromises.callGetUser(userTel);
      if (user.length === 0) {
        return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng.' });
      }
      return res.json(user);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
    }
};

const userAdd = async(req, res) => {
    const { userTel, userPass, userName, userAva } = req.body;

    try {
        const result = await userPromises.callAddUser(userTel, userPass, userName, userAva);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm user.' });
    }
};

const userInforUpdate = async(req, res) => {
    const { userTel, userPass, userName, userAva, userVIP } = req.body;

    try {
        const result = await userPromises.callUpdateUser(userTel, userPass, userName, userAva, userVIP);
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