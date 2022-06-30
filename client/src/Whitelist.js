import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./Socket";
import { UserContext } from "./UserContext";
import Tables from "./Tables";
function Raw() {
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [whitelist, setWhitelist] = useState([]);
  const [raw, setRaw] = useState({});

  useEffect(() => {
    console.log("data-request", user);
    socket.emit("data-request", user);
    socket.on("db-update", () => {
      console.log("db-update");
      socket.emit("data-request", user);
    });
    socket.on("db-response", (data) => {
      console.log(`db-response`, data);
      setRaw(data.raw);
      setWhitelist(data.whitelist);
    });
    return () => {
      socket.off("db-update");
      socket.off("data-request");
      socket.off("db-response");
    };
  }, [socket, user]);

  return (
    <>
      <div className="grid grid-cols-6 h-screen">
        {Object.entries(raw).map(([key, value]) => {
          return (
            <Tables
              key={key}
              index={key}
              whitelisted={whitelist.includes(key)}
              value={value[0]}
            />
          );
        })}
      </div>
    </>
  );
}
export default Raw;
