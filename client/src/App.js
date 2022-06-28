import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Config } from "./Config.js";
import { QueryClient, QueryClientProvider } from "react-query";
const socket = io("http://localhost:3001");

function App() {
  const queryClient = new QueryClient();
  const [value, setValue] = useState(null);
  useEffect(() => {
    socket.on("db_data", (data) => {
      setValue(data.message);
      console.log(`received db_data: ${data.message}`);
    });
    return () => {
      socket.emit("db_data", { message: "request" });
      console.log(`sending request db_data`);
      socket.off("db_data");
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-2">
        <Config db={value} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
