// src/utils/firebaseUpload.js
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");

const uploadImageToFirebase = async (file) => {
  const bucket = getStorage().bucket();
  const filename = `tickets/${uuidv4()}_${file.originalname}`;
  const fileUpload = bucket.file(filename);

  await fileUpload.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
  return imageUrl;
};

module.exports = uploadImageToFirebase;
