const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const Securitykey = Buffer.from(process.env.SECURITY_KEY, "hex");
const initVector = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return {iv: initVector.toString('hex'), encryptedData};
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
  let decryptedData = decipher.update(text.encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

module.exports = { encrypt, decrypt };
