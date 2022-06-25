import { useEffect, useState } from "react";
import { subscribe } from "./socket";

function Whitelist({ socket }) {
  const style = {
    order: "bg-red-500",
    call: "bg-red-500",
    pay: "bg-red-500",
    cancel: "bg-green-500",
  };
  const [whitelist, setWhitelist] = useState([]);
  useEffect(() => {
    return () => {
      subscribe("whitelisted", setWhitelist, socket);
    };
  }, [socket]);
  return (
    <div>
      <h1 className="text-3xl bg-yellow-300 text-center uppercase">
        whitelist
      </h1>
      <div className="grid grid-cols-5 ">
        {Object.entries(whitelist).map(([key, value]) => (
          <button key={key} className={`${style[value.at(-1)[0]]}  uppercase`}>
            {parseInt(key, 2).toString(16)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Whitelist;
