import {io} from "socket.io-client";
const ws = import.meta.env.VITE_WS
const URL = ws;

export const socket = io(URL, {
  autoConnect: false,
});
