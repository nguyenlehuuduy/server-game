const jwt = require('jsonwebtoken')
const MiddleWareController = {

    
    //verifytoken
    verifytoken: (req, res, next) => {
        console.log('hello')
        //token is access token
        // const token = req.headers.token;
        //code web monolithic, có thể set accesstoken lên cookie luôn(như thế dễ làm nhưng không bảo mật :))), nếu đúng thì chỉ lưu refresh token lên cookie rồi từ refesh token tạo lại accessToken)
        const token = req.cookies.access_token || req.headers.token; 
        if (token) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = token;
            console.log('haha-token', accessToken);
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {

                if (err) {
                    //return to login
                    res.status(403).json("token is not valid !");
                } else {
                    if (result.data.admin) {
                        next();
                    } else {
                        //refuse to login
                        res.status(403).json("You are not permited !");
                    }
                }
            })
        } else {
            // res.status(401).json("you are not authenticated !");
            //return to login view
            res.render('adm-login', { layout: 'blank_layout.hbs' })
        }
    }
}
module.exports = MiddleWareController; 