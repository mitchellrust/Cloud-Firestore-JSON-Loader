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
        // summary
        if (data["summary"] === "Needs Summary" || data["summary"] === "Needs Adoption" || data["summary"] === "To be written.") {
            data["summary"] = ""
        }

        //difficulty
        if (data["difficulty"] == "green") {
            data["difficulty"] = 1
        } else if (data["difficulty"] == "greenBlue") {
            data["difficulty"] = 2
        } else if (data["difficulty"] == "blue") {
            data["difficulty"] = 3
        } else if (data["difficulty"] == "blueBlack") {
            data["difficulty"] = 4
        } else if (data["difficulty"] == "black") {
            data["difficulty"] = 5
        }
    });

    let jsonData = JSON.stringify(dataArray, null, 4);

    fs.writeFileSync(writeFile, jsonData);
  });
});
