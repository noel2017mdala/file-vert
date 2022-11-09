const fs = require("fs");

function getFileSizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

module.exports = getFileSizeInBytes;
