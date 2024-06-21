"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();
const envVarsSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().optional(),
    DB_DATABASE: Joi.string().required(),
    RABBITMQ_URL: Joi.string().required(),
    RABBITMQ_QUEUE: Joi.string().required(),
    PORT: Joi.number().default(3000),
})
    .unknown()
    .required();
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    database: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_DATABASE,
    },
    rabbitmq: {
        url: envVars.RABBITMQ_URL,
        queue: envVars.RABBITMQ_QUEUE,
    },
    port: envVars.PORT,
};
//# sourceMappingURL=config.js.map