const getUrl = async (req) => {
  const file = req.file;
  return `https://api.defendertz.com/files/${file.originalname}`;
};
module.exports = getUrl;
