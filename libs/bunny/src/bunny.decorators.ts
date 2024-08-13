import { Inject } from '@nestjs/common';
import { BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE } from './bunny.constants';

export const BunnyStream = () => Inject(BUNNY_STREAM_SERVICE);

export const BunnyStorage = () => Inject(BUNNY_STORAGE_SERVICE);
