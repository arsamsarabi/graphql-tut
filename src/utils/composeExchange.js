import { CombinedError } from "./combinedError";

const fallback = sendResult => operation => {
  if (operation.operationName !== "teardown") {
    sendResult({
      operation,
      data: undefined,
      error: new CombinedError({
        networkError: new Error("Unhandled Operation")
      })
    });
  }
};

export const composeExchange = (client, exchange) => {
  return exchange.reduceRight((inner, exchange) => {
    return exchange({ client, forward: inner });
  }, fallback);
};
