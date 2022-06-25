import { io } from "socket.io-client";
const endpoint = "http://localhost:4001";

export const connectSocket = () => {
  const socket = io(endpoint);
  return socket;
};

export const disconnectSocket = (socket) => {
  socket.disconnect();
};

export const subscribe = ({ socket }, topic, setVariable) => {
  socket.emit(topic, {});
  socket.on(topic, (data) => {
    setVariable(data);
  });
};

export const message = (socket, topic, message) => {
  socket.emit(topic, message);
};
