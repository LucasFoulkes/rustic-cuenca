import "./App.css";
import Raw from "./Raw";
import { socket } from "./socket";
// import Whitelist from "./Whitelist";

function App() {
  return (
    <div className="grid grid-cols-2 ">
      <Raw socket={socket} />
      {/* <Whitelist socket={socket} /> */}
    </div>
  );
}

export default App;
