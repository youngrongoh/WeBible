const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

class ImageUploader {
  upload(file, onUploaded) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    }) //
      .then((response) => response.json())
      .then((result) => onUploaded(result));
  }
}

export default ImageUploader;
