import { decodeMessage } from "./src/decode-message.js";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const url = prompt("Enter document url:");

decodeMessage(url);
