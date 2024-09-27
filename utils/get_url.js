const getUrl = async (req) => {
  const file = req.file;
  return `http://3.87.66.11:5000/files/${file.originalname}`;
};
module.exports = getUrl;
