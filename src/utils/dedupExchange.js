export const dedupExchange = ({ forward }) => sendResult => {
  const activeOptions = new Set();
  const next = forward(result => {
    activeOptions.delete(result.operation.key);
    sendResult(result);
  });
  return operation => {
    if (operation.operationName === "teardown") {
      activeOptions.delete(operation.key);
      next(operation);
    } else if (!activeOptions.has(operation.key)) {
      activeOptions.add(operation.key);
      next(operation);
    }
  };
};
