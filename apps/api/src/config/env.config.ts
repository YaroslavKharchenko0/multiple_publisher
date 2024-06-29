import * as Joi from 'joi'

const allowLevels = ['info', 'debug', 'warn', 'error', 'verbose', 'silly']

const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('api'),
  LOG_LEVEL: Joi.string().allow(...allowLevels).default('info'),
  LOG_JSON: Joi.boolean().default(true),
})

export { envValidationSchema }
