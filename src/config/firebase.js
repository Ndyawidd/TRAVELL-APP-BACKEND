// const admin = require("firebase-admin");
// const serviceAccount = require("../../firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "travel-app-44ad0.firebasestorage.app", // ganti dengan milikmu
// });

// const bucket = admin.storage().bucket();
// module.exports = bucket;

import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

const serviceAccount = JSON.parse(
  readFileSync(path.resolve("src/config/firebase-travelapp-sdk.json"))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "travel-app-44ad0.firebasestorage.app",
});

const bucket = admin.storage().bucket();

export const uploadImageToFirebase = async (file) => {
  const fileName = Date.now() + "_" + file.originalname;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  await fileUpload.makePublic(); // agar bisa diakses publik
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};
