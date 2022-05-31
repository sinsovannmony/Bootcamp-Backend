const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/product_img/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
        req.body["fieldname"] = `${Date.now()}-${file.originalname}`;
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg  or png"), false);
    }
};
const upload_img = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload_img;
