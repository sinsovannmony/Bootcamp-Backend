module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const productController = require("../controllers/product.controller");
    var router = require("express").Router();
    app.use("/api/product", router);

    router.post("/create_product/", checkAuth, productController.product_create);
    router.get("/query_product/", productController.product_query);
    router.get("/query_product_by_id/:productId", productController.product_query_by_id);
    router.get("/query_product_base_on_user/", checkAuth, productController.product_query_base_on_user);
    router.post("/edit_product/:productId", productController.edit_product);
    router.delete("/delete_product/:productId", productController.delete_product);
};
