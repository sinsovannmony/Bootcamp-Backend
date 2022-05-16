module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const productController = require("../controllers/product.controller");
    var router = require("express").Router();
    app.use("/api/product", checkAuth, router);

    router.post("/create_product/", productController.product_create);
};
