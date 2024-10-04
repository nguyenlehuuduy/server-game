const curdHelper = require('../../helpers/crud');
const logger = require('../../constants/loggerConstant');
const AccountModel = require('../../models/AccountModel');
var jwt = require('jsonwebtoken');
require('dotenv').config()



class AdminServices {
    //genaration accesstoken
    async genarationAccessToken(account) {
        return jwt.sign({
            data: {
                id: account._id,
                admin: account.admin
            }
        }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' });
    }
    //genaration refresstoken
    async genarationRefreshToken(account) {
        return jwt.sign({
            data: {
                id: account._id,
                admin: account.admin
            }
        }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: '30d' });
    }
    //authorization admin account service
    async authorAdminService(req, res, next) {
        console.log(req.body)
        const errors = [];
        try {
            //handle athor in here
            if (!req) {
                console.log("no request !");
                return {
                    status: "failure",
                    log: "fail to request to server !"
                };
            } else {
                console.log("handle request !")
                if (!req.body.admUsername) {
                    return {
                        status: "failure",
                        log: "can't find username"
                    };
                }
                if (!req.body.admPassword) {
                    return {
                        status: "failure",
                        log: "can't find password"
                    };
                }
                //check admin account
                let rs = await AccountModel.findOne(
                    {
                        username: req.body.admUsername,
                        password: req.body.admPassword
                    }
                )
                if (rs) {
                    console.log('account isvalid');
                    if (rs.admin === true) {
                        console.log('Admin login');
                        const access_token = await this.genarationAccessToken(rs);
                        // const refresh_token = await this.genarationRefreshToken(rs);
                        // console.log('access_token', access_token)
                        //save token in client
                        // res.cookie("refreshToken", refresh_token, {
                        //     httpOnly: true,
                        //     secure: false,
                        //     path: "/",
                        //     samSite: "strict"
                        // })
                        var cookie = req.cookies.access_token;
                        if (cookie === undefined) {
                            console.log('create cookie !', access_token);
                            res.cookie('access_token', access_token, {
                                httpOnly: true,
                                secure: false,
                                maxAge: 9000000,
                                path: "/",
                                samSite: "strict"
                            })
                        } else {
                            console.log('cookie exists');
                        }

                        return ({
                            status: "ok",
                            data: rs._id
                        }
                        )
                    } else {
                        //xoa coookie
                        return {
                            status: "failure",
                            log: "no permision account !"
                        }
                    }
                } else {
                    console.log('cant not find account !')
                    return {
                        status: "failure",
                        log: "cant not find account"
                    }
                }
            }
        } catch (error) {
            errors.push(error)
        }
    }
    // //reset accesstoken by refresh token
    // async resetTokenByRefreshToken(req, res, next) {
    //     const refreshToken = req.cookies.refreshToken;

    //     if (!refreshToken) {
    //         return res.status(401).json("You're not authenticated ");
    //     }

    //     jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY, (err, account) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         const newAccessToken = genarationAccessToken(account);
    //         const newRefreshToken = genarationRefreshToken(account);
    //         //save in cookies
    //         res.cookie("refreshToken", newRefreshToken, {
    //             httpOnly: true,
    //             secure: false,
    //             path: "/",
    //             samSite: "strict"
    //         })
    //         return es.status(200).json({ accessToken: newAccessToken });
    //     })
    // }
}
module.exports = new AdminServices();