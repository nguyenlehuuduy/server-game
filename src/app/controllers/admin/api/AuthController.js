const jwt = require("jsonwebtoken");
const AdminServies = require("../../../services/admin/AdminServies");

// Constants
class AuthController {
    //login admin
    async index(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            let result = await AdminServies.authorAdminService(req, res, next);
            if (result.status == 'ok') {
                res.status(200).json({
                    status: 'ok',
                    permit: 'admin',
                    data: result.data
                });
            }
            return res.status(200).json({
                status: 'failure',
                permit: 'no accept'
            })
        } catch (error) {
            console.log(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            let result = await AdminServies.resetTokenByRefreshToken(req, res, next);
            res.send(result);

        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new AuthController();
