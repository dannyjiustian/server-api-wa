/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import { delay, targetNumber } from "../configs/server.config.js";
import {
  responseServer200,
  responseServer500,
} from "../configs/response.config.js";
import { sock } from "./bot.controller.js";
import { validateSend } from "./validation.controller.js";

let response_error;

const convertTimestamp = (timestamp) => {
  const jakartaTimezone = "Asia/Jakarta";
  const jakartaDate = new Date(timestamp);
  const jakartaOptions = {
    timeZone: jakartaTimezone,
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = jakartaDate.toLocaleString("id-ID", jakartaOptions);
  return `${formattedDate} WIB`;
};

const send = async (req, res) => {
  response_error = {};
  const { error } = validateSend(req.body);
  if (error)
    error.details.forEach((err_msg) => {
      response_error[err_msg.path[0]] = err_msg.message;
    });
  if (Object.keys(response_error).length === 0) {
    try {
      const { from, message, location, timestamp, ip, browser } = req.body;
      await delay(2500);
      await sock.sendMessage(targetNumber, {
        text: `Mendapatkan Harapan Baru Untuk Kamu\n\nDari: *${from}*\nHarapan: *${message}*\nTanggal: *${convertTimestamp(
          timestamp
        )}*\nLokasi: *${location}*\nIP: *${ip}*\nBrowser: *${browser}*`,
      });
      responseServer200(res, "Successfully Send Whishs");
    } catch (error) {
      return responseServer500(res, "Error Send Whishs", error.message);
    }
  } else {
    responseServer500(
      res,
      "Failed to process endpoint, check",
      JSON.parse(JSON.stringify(response_error).replace(/\\"/g, ""))
    );
  }
};

export default send;
