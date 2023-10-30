/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import { pino } from "./server.config.js";
import makeWASocket, { isJidBroadcast } from "@whiskeysockets/baileys";

/**
 * English: functions that will be used in the endpoint
 * Indonesian: fungsi-fungsi yang akan digunakan di endpoint
 */
const botSocket = (state) => {
  const sock = makeWASocket.default({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: "silent" }),
    shouldIgnoreJid: isJidBroadcast,
    browser: ["Mac OS", "Mac OS", "3.0"],
  });
  return sock;
};
export default botSocket;
