module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const cartController = require("../controllers/cart.controller");
    var router = require("express").Router();
    app.use("/api/cart", router);

    router.post("/create_cart/", checkAuth, cartController.cart_create);
    router.get("/query_cart/", cartController.cart_query);
    router.get("/query_cart_by_id/:cartId", cartController.cart_query_by_id);
    router.get("/query_cart_base_on_user/", checkAuth, cartController.cart_query_base_on_user);
    router.post("/edit_cart/:cartId", cartController.edit_cart);
    router.delete("/delete_cart/:cartId", cartController.delete_cart);
};
