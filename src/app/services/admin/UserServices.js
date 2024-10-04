const curdHelper = require("../../helpers/crud");
const mongoose = require("mongoose");
const UserModel = require("../../models/UserModel");
class UserServices {
  async CHECK_VALID_ID(ID, functionCheck) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      let check_valid_id = await functionCheck(false, ID);
      if (!check_valid_id) {
        ID = null;
        console.log("id is not valid");
        return null;
      } else {
        return ID;
      }
    } else {
      return null;
    }
  }
  // get All Users
  async getAllUser(req, res, next) {
    try {
      if (req) {
        let data = await curdHelper.getAll({
          model: "user",
          query: req.query,
          // populate: [{ path: 'category', strictPopulate: false }],
        });
        data = data.map((data) => data.toObject());
        return data;
      }
    } catch (error) {
      return error;
    }
  }
  //get user by id
  async getUserbyID(req, res, next) {
    try {
      let idUser;
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        idUser = req.params.id;
      } else {
        return {
          status: "400",
          log: "uid account is not valid !",
        };
      }
      if (req) {
        console.log(req.params.id);
        let data = await curdHelper.getSingle({
          model: "user",
          query: req.query,
          id: idUser,
          // populate: [{ path: 'category', strictPopulate: false }],
        });
        if (data) {
          return {
            status: "200",
            log: "request ok",
            obj: data,
          };
        }
        return {
          status: "401",
          log: "you dont have permision !",
          obj: data,
        };
      }
    } catch (error) {
      return error;
    }
  }

  //Add new user
  async addNewUser(req, res, next) {
    try {
      if (req) {
        let new_obj = {
          username: req.body.username || null,
          password: req.body.password || null,
          name: req.body.name || null,
          birth: req.body.birth || null,
          sex: req.body.sex || null,
        };
        let data = await curdHelper.create({
          model: "user",
          obj: new_obj,
        });
        return {
          data: data,
          obj: new_obj,
        };
      }
    } catch (error) {
      return error;
    }
  }
  //check username
  async checkusernameUser(req, res) {
    const username = req.body.username;
    const user = await UserModel.findOne({ username: username });

    if (user) {
      res.send("not-available");
    } else {
      res.send("available");
    }
  }

  async checkusernameandbirth(req, res) {
    const username = req.body.username;
    const birth = req.body.birth;
    const user = await UserModel.find({ username: username, birth: birth });

    if (user.length > 0) {
      // Tìm thấy người dùng có tên đăng nhập và ngày sinh tương tự
      res.send("not-available");
    } else {
      // Không tìm thấy người dùng tương tự
      res.send("available");
    }
  }

  //Check username and password
  async checkusernameandpasss(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await UserModel.find({
      username: username,
      password: password,
    });

    if (user.length > 0) {
      // Tìm thấy người dùng có tên đăng nhập và ngày sinh tương tự
      res.send("not-available");
    } else {
      // Không tìm thấy người dùng tương tự
      res.send("available");
    }
  }

  async updatepass(req, res) {
    try {
      const { username, newPassword } = req.body;

      // Tìm người dùng dựa trên tên đăng nhập
      const user = await UserModel.findOne({ username: username });

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
      // Cập nhật mật khẩu của người dùng
      user.password = newPassword;
      // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
      await user.save();

      return res
        .status(200)
        .json({ message: "Mật khẩu đã được cập nhật thành công." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi cập nhật mật khẩu." });
    }
  }
  //check login
  // Khi đăng nhập thành công
  async loginUser(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      // Thực hiện truy vấn để lấy thông tin người dùng
      const user = await UserModel.findOne({
        username: username,
        password: password,
      });
      // Kiểm tra nếu có kết quả trả về
      if (user) {
        // Gửi thông tin người dùng về cho client
        res.json(user);
      } else {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //update user
  async updateUser(request) {
    if (request) {
      try {
        let data = await curdHelper.update({
          model: "user",
          id: request.body._id,
          obj: request.body.obj,
        });
        return {
          data: data,
          obj: request.body.obj,
        };
      } catch (error) {
        console.log(error);
        return "error";
      }
    }
  }

  // Service delete type-question
  async deleteUser(request) {
    if (request) {
      try {
        if (mongoose.Types.ObjectId.isValid(request.params.id)) {
          UserModel.deleteOne({ _id: request.params.id }).then(() => {});
          return "success";
        } else {
          return {
            status: "error",
            data: "null",
          };
        }
      } catch (error) {
        console.log(error);
        return "error";
      }
    }
  }
}

module.exports = new UserServices();
