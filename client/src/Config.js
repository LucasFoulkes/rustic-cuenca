import { useQuery, useState, useEffect } from "react-query";
import Tables from "./Tables";
import { fetchTables, fetchWhitelist } from "./hooks/useFetch";

export function Config(db) {
  const { data: tables } = useQuery("tables", fetchTables);
  const { data: whitelist, refetch } = useQuery("whitelist", fetchWhitelist);
  return (
    <>
      <div>
        <div className="grid grid-cols-5">
          {tables && whitelist
            ? Object.entries(tables).map(([key, value]) => (
                <Tables
                  key={key}
                  index={key}
                  value={value}
                  refetch={refetch}
                  whitelisted={whitelist.includes(key)}
                />
              ))
            : "...loading"}
        </div>
      </div>
      <div>
        {whitelist
          ? Object.keys(whitelist).map((key) => (
              <div key={key}>
                {parseInt(whitelist[key], 2).toString(16).toUpperCase()}
              </div>
            ))
          : "...loading"}
      </div>
    </>
  );
}
