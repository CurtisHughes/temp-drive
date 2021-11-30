import words from './words';

// TEMPORARY PLACEHOLDER UNTIL BACKEND IS IMPLEMENTED
// TODO: use crypto library from backend
export const generatePassphrase = (passphraseLength: number = 4) => {
  const passphrase = [];

  for (let index = 0; index < passphraseLength; index++) {
    const number = crypto.getRandomValues(new Uint32Array(1))[0];
    passphrase.push(words[number % words.length]);
  }

  return passphrase.join('-');
};
