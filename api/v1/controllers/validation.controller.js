/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import joi from "joi";

/**
 * English: functions that will be used for validation
 * Indonesian: fungsi-fungsi yang akan digunakan untuk validasi
 */
const validateSend = (requestData) => {
  const sendSchema = joi
    .object({
      from: joi.string().required(),
      message: joi.string().required(),
      timestamp: joi.date().timestamp().required(),
      location: joi.string().required(),
      ip: joi
        .string()
        .ip({
          version: ["ipv4"],
        })
        .required(),
      browser: joi.string().required(),
    })
    .options({ abortEarly: false });
  return sendSchema.validate(requestData);
};

/**
 * English: export validation configuration
 * Indonesian: export konfigurasi validasi
 */
export { validateSend };
