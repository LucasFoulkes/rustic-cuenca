import "./App.css";
import { socket, SocketContext } from "./Socket";
import { useState } from "react";
import { UserContext } from "./UserContext";
import Whitelist from "./Whitelist";
import Restaurant from "./Restaurant";

function App() {
  const [user, setUser] = useState({ id: "admin" });
  console.log(user);
  return (
    <SocketContext.Provider value={socket}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App grid grid-cols-2  ">
          <Whitelist />
          <Restaurant />
        </div>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
