// /**
//  * Copyright 2023 @ by Open University. All rights reserved
//  * Author: Thành Nam Nguyễn (DH19IT03)
//  */

export const encryptData = {
  localStorageName: 'encryptedData', // The name of the local storage item to use for encrypted data
  ivName: 'iv', // Generate a random initialization vector (IV) for AES-GCM
  key: 'v6z9y$B&E)H@McQfTjWnZr4u7x!A%D*G', // The key to use for encrypting and decrypting data

  /**
   * Encrypts the specified object using AES-GCM and saves it to local storage.
   *
   * @param {object} data The data to encrypt and save.
   *
   * @returns {Promise} A Promise that resolves when the data has been encrypted and saved to local storage.
   */
  encrypt: async (data) => {
    const encryptionAlgorithm = { name: 'AES-GCM', length: 256 };
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptionKey = new TextEncoder().encode(encryptData.key);
    const dataBytes = new TextEncoder().encode(JSON.stringify(data));

    const key_1 = await crypto.subtle.importKey('raw', encryptionKey, encryptionAlgorithm, false, ['encrypt']);
    const encryptedDataBytes = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key_1, dataBytes);
    const base64EncryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedDataBytes)));
    const base64IV = btoa(String.fromCharCode(...new Uint8Array(iv)));
    localStorage.setItem(encryptData.localStorageName, base64EncryptedData);
    localStorage.setItem(encryptData.ivName, base64IV);
    return await Promise.resolve();
  },

  /**
   * Decrypts the data from local storage using AES-GCM and returns it as an object.
   *
   * @param {string} key The key to use for decrypting the data.
   *
   * @returns {Promise<object>} A Promise that resolves with the decrypted object.
   */
  decrypt: async () => {
    const decryptionAlgorithm = { name: 'AES-GCM', length: 256 };
    const base64EncryptedData = localStorage.getItem(encryptData.localStorageName);
    const base64IV = localStorage.getItem(encryptData.ivName);
    const encryptedData = new Uint8Array(
      atob(base64EncryptedData)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );
    const iv = new Uint8Array(
      atob(base64IV)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );
    const decryptionKey = new TextEncoder().encode(encryptData.key);

    const key_2 = await crypto.subtle.importKey('raw', decryptionKey, decryptionAlgorithm, false, ['decrypt']);
    const decryptedDataBytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key_2, encryptedData);
    const decryptedDataString = new TextDecoder().decode(decryptedDataBytes);
    const decryptedObject = JSON.parse(decryptedDataString);
    return await Promise.resolve(decryptedObject);
  },

  clearData: () => {
    localStorage.removeItem(encryptData.localStorageName);
    localStorage.removeItem(encryptData.ivName);
  },
};
