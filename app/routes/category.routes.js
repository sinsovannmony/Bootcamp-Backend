module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const categoryController = require("../controllers/category.controller");
    var router = require("express").Router();
    app.use("/api/category", checkAuth, router);

    router.post("/create_category/", categoryController.category_create);
    router.get("/query_category/", categoryController.category_query);
    router.get("/query_category_by_id/:categoryId", categoryController.category_query_by_id);
};
