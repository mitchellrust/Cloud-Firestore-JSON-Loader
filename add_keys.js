'use strict';

const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf(".");
    var writeFile = "./updated_files/" + file.substring(0, lastDotIndex) + ".json";

    var dataArray = require("./files/" + file);
    dataArray.forEach(function(data) {
      data["type"] = "Hiking"
    });

    let jsonData = JSON.stringify(dataArray, null, 4);

    fs.writeFileSync(writeFile, jsonData);
  });
});
