function route(app) {
    app.use('/admin', require("./admin.routes"));
    app.use('/', require("./home.routes"));
}
module.exports = route;