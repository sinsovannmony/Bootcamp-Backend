module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const productHistoryController = require("../controllers/historyProduct.controller");
    var router = require("express").Router();
    app.use("/api/historyProduct", router);

    router.post("/create_history_product/", checkAuth, productHistoryController.product_history_create);
    router.get("/query_history_product/", productHistoryController.product_history_query);
    router.get(
        "/query_history_product_base_on_user/",
        checkAuth,
        productHistoryController.product_history_query_base_on_user
    );
    router.delete("/delete_history_product/:producthistoryId", productHistoryController.delete_product_history);
};
