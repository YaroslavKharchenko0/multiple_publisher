import * as Joi from 'joi'

const allowLevels = ['info', 'debug', 'warn', 'error', 'verbose', 'silly']

const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('api'),
  LOG_LEVEL: Joi.string().allow(...allowLevels).default('info'),
  LOG_JSON: Joi.boolean().default(true),
  RMQ_URI: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SSL: Joi.boolean().default(false),
  COGNITO_USER_POOL_ID: Joi.string().required(),
  COGNITO_CLIENT_ID: Joi.string().required(),
  COGNITO_REGION: Joi.string().required(),
  COGNITO_JWKS_URI: Joi.string().required(),
  COGNITO_AUTHORITY: Joi.string().required(),
  BUNNY_STORAGE_ENDPOINT: Joi.string().required(),
  BUNNY_STORAGE_ZONE_NAME: Joi.string().required(),
  BUNNY_STORAGE_API_KEY: Joi.string().required(),
  BUNNY_STREAM_LIBRARY_ID: Joi.string().required(),
  BUNNY_STREAM_API_KEY: Joi.string().required(),
  BUNNY_STREAM_VIDEO_URL: Joi.string().required(),
  VERSION: Joi.string().required(),
  COGNITO_ACCESS_KEY_ID: Joi.string().required(),
  COGNITO_SECRET_ACCESS_KEY: Joi.string().required(),
})

export { envValidationSchema }
