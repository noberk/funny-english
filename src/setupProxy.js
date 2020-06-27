const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://www.andoso.cn/",
            changeOrigin: true
        })
    )
};