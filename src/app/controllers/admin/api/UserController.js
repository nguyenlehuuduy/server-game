const UserServices = require('../../../services/admin/UserServices')

class UserController {
    //get All Users Contorller
    async getAllUser(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.getAllUser(request, response, next);
                if (rs) {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //get User by Id Contorller

    async getUserById(request, response, next) {
        try {
            if (request ) {
                let rs = await UserServices.getUserbyID(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
    // add user controller
    async addNewUser(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.addNewUser(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    //login
    async loginUser(request, response, next) {
        try {
            let rs = await UserServices.loginUser(request, response, next);
            // Kiểm tra xem có thông tin người dùng được trả về hay không
            if (rs && rs.name) {
                response.json(rs);
            } 
        } catch (error) {
            console.error(error);
        }
    }
    
    //update user controller 
    async updateUser(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.updateUser(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //update pass on username
    async updatepass(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.updatepass(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // delete user
    async deleteUser(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.deleteUser(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
    //check user
    async checkUser(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.checkusernameUser(request, response, next);
                rs.data == "success"
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
    //check user and birth
    async checkusernameandbirth(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.checkusernameandbirth(request, response, next);
                rs.data == "success"
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
    // Check username and password for login
    async checkusernameandpass(request, response, next) {
        try {
            if (request) {
                let rs = await UserServices.checkusernameandpasss(request, response, next);
                rs.data == "success"
                response.json(rs);
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController;