import { useEffect, useState } from "react";
import { subscribe } from "./socket";
import Tables from "./Tables";

function Raw({ socket }) {
  const [rawData, setRawData] = useState({});
  const [whitelist, setWhitelist] = useState([]);
  useEffect(() => {
    // not sure why the fuck this works but it do
    return () => {
      subscribe("rawData", setRawData, socket);
      subscribe("whitelist", setWhitelist, socket);
    };
  }, [socket]);

  return (
    <div>
      <h1 className="text-3xl  uppercase bg-yellow-300 text-center">
        raw data
      </h1>
      <div className="grid grid-cols-5">
        {Object.entries(rawData).map(([key, value]) => (
          <Tables
            socket={socket}
            key={key}
            value={value}
            index={key}
            whitelisted={whitelist.includes(key)}
          />
        ))}
      </div>
    </div>
  );
}
export default Raw;
