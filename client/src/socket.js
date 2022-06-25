import io from "socket.io-client";

export const socket = io("http://localhost:4001");

export const subscribe = (topic, set, socket) => {
  socket.emit(topic, { message: "subscribe" });
  socket.on(topic, (data) => {
    console.log(`${topic} received`);
    try {
      set(data);
    } catch (e) {
      console.log(e);
    }
  });
};
