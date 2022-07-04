import { useEffect, useState, useContext } from "react";
import { SocketContext } from "./Socket";
import { UserContext } from "./UserContext";
import { FaConciergeBell } from "react-icons/fa";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

function Restaurant() {
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    socket.emit("restaurant-request", user);
    socket.on("db-response", () => {
      socket.emit("restaurant-request", user);
    });
    socket.on("restaurant-request", (data) => {
      console.log(`restaurant-request`, data);
      setRestaurant(data);
    });
    return () => {
      socket.off("db-update");
      socket.off("restaurant-request");
    };
  }, [socket, user]);

  return (
    <div className="grid grid-cols-5 gap-1">
      {Object.entries(restaurant).map(([key, value]) => {
        return (
          <div
            className={`grid grid-rows-2  relative ${
              value[0] === "cancel" ? "bg-green-200" : "bg-amber-200"
            }`}
            key={key}
          >
            <div>
              <p>{parseInt(key, 2).toString(16).toUpperCase()}</p>
              <p>
                {formatDistanceToNowStrict(new Date(value[1] * 1000), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </p>
            </div>

            <div
              onClick={() => {
                socket.emit("table-request", {
                  user,
                  table: key,
                });
              }}
              className={`w-full grid p-2 place-content-center ${
                value[0] === "cancel"
                  ? "bg-green-300  hover:bg-green-400 active:bg-green-500"
                  : "bg-amber-300 hover:bg-amber-400 active:bg-amber-500"
              } `}
            >
              <FaConciergeBell size="25px" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Restaurant;
