module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const tagController = require("../controllers/tag.controller");
    var router = require("express").Router();
    app.use("/api/tag", router);

    router.post("/add_tag/", tagController.tag_add);
    router.get("/query_tag/", tagController.tag_query);
    router.get("/query_tag_by_id/:productId/", tagController.tag_query_by_productId);
};
