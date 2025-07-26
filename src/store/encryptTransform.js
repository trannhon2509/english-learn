
import CryptoJS from 'crypto-js';
import { createTransform } from 'redux-persist';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const EncryptTransform = createTransform(
  // Mã hóa khi lưu
  (inboundState) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(inboundState),
        SECRET_KEY
      ).toString();
      return encrypted;
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return inboundState;
    }
  },
  // Giải mã khi lấy ra
  (outboundState) => {
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decrypted;
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return outboundState;
    }
  }
);

export default EncryptTransform;
