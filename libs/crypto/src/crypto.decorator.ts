import { Inject } from '@nestjs/common';
import {
  CRYPTO_HASH_SERVICE,
  CRYPTO_JWE_SERVICE,
  CRYPTO_JWT_SERVICE,
} from './crypto.constants';

export const CryptoHash = () => Inject(CRYPTO_HASH_SERVICE);

export const CryptoJwt = () => Inject(CRYPTO_JWT_SERVICE);

export const CryptoJwe = () => Inject(CRYPTO_JWE_SERVICE);
