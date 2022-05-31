module.exports = (app) => {
    const checkAuth = require("../middlewares/checkToken");
    const categoryController = require("../controllers/category.controller");
    const upload_img = require("../middlewares/uploadImage");
    const selectFolderName = require("../middlewares/selectFolder");
    var router = require("express").Router();
    app.use("/api/category", router);

    router.post("/create_category/", categoryController.category_create);
    router.get("/query_category/", categoryController.category_query);
    router.get("/query_category_by_id/:categoryId", categoryController.category_query_by_id);
    router.post("/insert/" ,  selectFolderName, upload_img.fields([{ name: "image", maxCount: 1 }]) , (req,res)=> {
        const imgsrc = req.body.fieldname;
        return res.status(200).json(imgsrc);
    } );
};
