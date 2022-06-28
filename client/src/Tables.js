import { useState, useEffect } from "react";
import useSendPost from "./hooks/useSendPost.js";

function Tables({ index, value, refetch, whitelisted }) {
  const [toggle, setToggle] = useState(false);
  const style = {
    order: "bg-red-500",
    call: "bg-red-500",
    pay: "bg-red-500",
    cancel: "bg-green-500",
  };
  const { mutate: addTable } = useSendPost("add");
  const { mutate: delTable } = useSendPost("remove");

  useEffect(() => {
    if (whitelisted) {
      setToggle(true);
    }
  }, [whitelisted]);

  return (
    <button
      onClick={() => {
        refetch();
        if (toggle) {
          delTable({ index });
        } else {
          addTable({ index });
        }
        setToggle(!toggle);
      }}
      className={
        toggle
          ? "bg-white p-4 uppercase hover:bg-slate-400"
          : `${style[value.at(-1)[0]]}  p-4 uppercase hover:bg-slate-500`
      }
    >
      {parseInt(index, 2).toString(16)}
    </button>
  );
}
export default Tables;
