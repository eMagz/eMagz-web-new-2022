import io from 'socket.io-client';
import { ImageUrl } from "./API"
let socket;

socket = io(ImageUrl, {
  transports: ['polling' ],
  // jsonp: false,
  // secure: true,
});
socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('connection to server lost.');
});

export default socket;
