function filterValid(snapshot) {
  let tables = {};
  const validIds = new Map([
    ["0001", "order"],
    ["0010", "call"],
    ["0100", "pay"],
    ["1000", "cancel"],
  ]);
  Object.entries(snapshot).forEach(([key, value]) => {
    timestamp = key;
    tableId = value.slice(0, -4);
    message = validIds.get(value.slice(-4));

    if (validIds.has(value.slice(-4))) {
      tables[tableId] = [message, timestamp];
    }
  });
  return tables;
}

function filterAllValid(snapshot) {
  let tables = {};
  const validIds = new Map([
    ["0001", "order"],
    ["0010", "call"],
    ["0100", "pay"],
    ["1000", "cancel"],
  ]);
  Object.entries(snapshot).forEach(([key, value]) => {
    timestamp = key;
    tableId = value.slice(0, -4);
    message = validIds.get(value.slice(-4));

    if (validIds.has(value.slice(-4))) {
      if (tables[tableId] === undefined) {
        tables[tableId] = [[message, timestamp]];
      } else {
        tables[tableId] = tables[tableId].concat([[message, timestamp]]);
      }
    }
  });
  return tables;
}

function filterWhitelist(rawData, whitelist) {
  whitelistedTables = {};
  for (const [key, value] of Object.entries(rawData)) {
    if (whitelist.has(key)) {
      whitelistedTables[key] = value;
    }
  }
  return whitelistedTables;
}

module.exports = { filterValid, filterWhitelist };
