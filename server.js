const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const initData = require("./app/models/initialData.model");

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    initData.initial_user();
    initData.initial_category();
    initData.initial_product();
    initData.initial_tag();
});

require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/historyProduct.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
