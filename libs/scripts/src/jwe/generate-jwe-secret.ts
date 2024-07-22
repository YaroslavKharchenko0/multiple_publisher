import { JWK } from 'node-jose';

async function generateJwkSecretData() {
  const key = await JWK.createKey('oct', 256, { alg: 'A256GCM', use: 'enc' });

  const jwkJson = key.toJSON(true);

  return JSON.stringify(jwkJson);
}

generateJwkSecretData().then((jwkSecretData) => {
  console.log('Generated JWK Secret Data:', jwkSecretData);
});
