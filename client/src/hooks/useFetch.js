const fetchTables = async () => {
  const res = await fetch("http://localhost:3001/tables");
  return res.json();
};

const fetchWhitelist = async () => {
  const res = await fetch("http://localhost:3001/tables/whitelist");
  return res.json();
};

export { fetchWhitelist, fetchTables };
