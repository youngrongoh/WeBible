const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

class ImageUploader {
  async upload(file, userId) {
    const formData = new FormData();

    const params = {
      timestamp: Math.round(new Date().getTime() / 1000),
      upload_preset: UPLOAD_PRESET,
      folder: 'webible',
      public_id: userId,
      overwrite: true,
    };

    const signature = await generateSignature(params);

    formData.append('file', file);
    formData.append('api_key', API_KEY);
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    formData.append('signature', signature);

    const result = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    return await result.json();
  }
}

function generateSignature(params) {
  const sorted = Object.keys(params).sort();
  const string =
    sorted.map((key) => `${key}=${params[key]}`).join('&') + API_SECRET;
  return convertHash(string);
}
/* from mdn
 * Link: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */
async function convertHash(string) {
  const msgUint16 = new TextEncoder().encode(string); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint16); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export default ImageUploader;
