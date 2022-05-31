module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const categoryController = require("../controllers/category.controller");
    const upload_category_img = require("../middlewares/uploadCategoryImage");
    var router = require("express").Router();
    app.use("/api/category", router);

    router.post(
        "/create_category/",
        upload_category_img.fields([{ name: "image", maxCount: 1 }]),
        categoryController.category_create
    );
    router.get("/query_category/", categoryController.category_query);
    router.get("/query_category_by_id/:categoryId", categoryController.category_query_by_id);
};
