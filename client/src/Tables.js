import { useEffect, useState } from "react";

function Tables({ socket, value, index, whitelisted }) {
  const [toggle, setToggle] = useState(false);
  const style = {
    order: "bg-red-500",
    call: "bg-red-500",
    pay: "bg-red-500",
    cancel: "bg-green-500",
  };
  useEffect(() => {
    if (whitelisted) {
      setToggle(true);
    }
  }, [whitelisted]);

  return (
    <button
      onClick={() => {
        if (toggle) {
          socket.emit("whitelist", { message: "remove", index: index });
        } else {
          socket.emit("whitelist", { message: "add", index: index });
        }
        setToggle(!toggle);
      }}
      className={
        toggle
          ? "bg-white  uppercase"
          : `${style[value.at(-1)[0]]}  uppercase hover:bg-white`
      }
    >
      {parseInt(index, 2).toString(16)}
    </button>
  );
}
export default Tables;
