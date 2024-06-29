import * as Joi from 'joi'

const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
})

export { envValidationSchema }
