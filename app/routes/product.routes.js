module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const productController = require("../controllers/product.controller");
    const upload_img = require("../middlewares/uploadImage");
    const selectFolderName = require("../middlewares/selectFolder");
    var router = require("express").Router();
    app.use("/api/product", router);

    router.post("/create_product/", upload_img.fields([{ name: "image", maxCount: 1 }]), productController.product_create);
    router.get("/query_product/", productController.product_query);
    router.get("/query_product_by_id/:productId", productController.product_query_by_id);
    router.post("/edit_product/:productId", productController.edit_product);
};
