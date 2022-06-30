import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SocketContext } from "./Socket";

function Tables({ index, whitelisted, value }) {
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    whitelisted ? setToggle(true) : setToggle(false);
  }, [whitelisted]);

  return (
    <button
      onClick={() => {
        if (toggle) {
          socket.emit("whitelist-del", {
            user,
            index,
          });
        } else {
          socket.emit("whitelist-add", {
            user,
            index,
          });
        }
        setToggle(!toggle);
      }}
      className={` relative ${toggle ? " font-bold  " : "hover:font-bold "} ${
        value === "cancel" ? "" : "bg-slate-200"
      }`}
    >
      {parseInt(index, 2).toString(16).toUpperCase()}
    </button>
  );
}
export default Tables;
