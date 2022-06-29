import "./App.css";
import { socket, SocketContext } from "./Socket";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import Raw from "./Raw";

function App() {
  const [user, setUser] = useState({ id: "admin" });
  console.log(user);
  return (
    <div className="App grid grid-cols-2 ">
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={{ user, setUser }}>
          <Raw />
        </UserContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
