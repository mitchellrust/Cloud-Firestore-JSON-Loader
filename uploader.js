var admin = require("firebase-admin");

// see firebase project -> Settings -> service accounts to generate this file
var serviceAccount = require("./service_key.json");

// Add database url to this file
// See firebase project -> Settings -> service accounts for this value
var databaseInfo = require("./database_info.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // See firebase project -> Settings -> service accounts for this value
  databaseURL: databaseInfo["url"]
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf(".");

    var menu = require("./files/" + file);

    menu.forEach(function(obj) {
      // create new document with random id
      var document = firestore.collection(file.substring(0, lastDotIndex)).doc()
      // Add id attribute to JSON object
      obj["id"] = document.id
      document.set(obj).then(function(docRef) {
        // print the written document's id to console
        console.log(document.id);
      }).catch(function(error) {
        console.error("Error adding document " + document.id + " : ", error);
      });
    });
  });
});
