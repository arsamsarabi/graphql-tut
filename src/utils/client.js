import { fetchExchange } from "./fetchExchange";
import { dedupExchange } from "./dedupExchange";
import { composeExchange } from "./composeExchange";

export class Client {
  constructor(url, opts = {}) {
    this.context = {
      url,
      fetch: opts.fetch || window.fetch.bind(window),
      fetchOptions: opts.fetchOptions || {},
      requestPolicy: opts.requestPolicy || "cache-first"
    };
    const exchanges = opts.exchanges || [dedupExchange, fetchExchange];
    this.sendOperation = composeExchange(this, exchanges)(this.onResult);
    this.listeners = {};
  }

  onOperationStart(operation, cb) {
    const { key } = operation;
    const listeners = this.listeners[key] || (this.listeners[key] = new Set());
    listeners.add(cb);

    this.sendOperation(operation);
  }

  onOperationEnd(operation, cb) {
    const { key } = operation;
    const listeners = this.listeners[key] || (this.listeners[key] = new Set());
    listeners.remove(cb);
  }

  onResult = result => {
    const { key } = result.operation;
    const listeners = this.listeners[key] || (this.listeners[key] = new Set());
    listeners.forEach(listener => listener(result));
  };

  execute = async (baseOperation, cb) => {
    const operation = {
      ...baseOperation,
      context: {
        ...this.context,
        ...baseOperation.context
      }
    };

    this.onOperationStart(operation, cb);
    return () => this.onOperationEnd(operation, cb);
  };
}
