import { useQuery, useMutation } from "react-query";
import axios from "axios";

export function Config() {
  const style = {
    order: "bg-red-500",
    call: "bg-red-500",
    pay: "bg-red-500",
    cancel: "bg-green-500",
  };
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("http://localhost:3001/tables").then((res) => res.data)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const createEmployee = async (data: Employee) => {
    const { data: response } = await axios.post(
      "https://employee.free.beeceptor.com/create",
      data
    );
    return response.data;
  };

  return (
    <div className="grid grid-cols-7">
      {Object.entries(data).map(([key, value]) => (
        <button
          className={`${
            style[value.at(-1)[0]]
          } p-4 text-center hover:bg-slate-200`}
          key={key}
        >
          {parseInt(key, 2).toString(16).toUpperCase()}
        </button>
      ))}
    </div>
  );
}
