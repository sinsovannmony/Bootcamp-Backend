const selectFolderName = function selectFolderName(req, res, next) {
  req.folderName = "product_image";
  next();
};
module.exports = selectFolderName;
