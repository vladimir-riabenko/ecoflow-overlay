export function getNonce(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export function getCurrentTimeMillis(): number {
  return (new Date()).getTime();
}

export function getSignature(str: string, secretKey: string): string {
  const CryptoJS = require('crypto-js');

  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(str, secretKey));
}
