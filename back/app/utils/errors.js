export class NotFoundError extends Error {
    constructor(message, opts) {
      // Je précise un message par défaut
      super(message || 'Not found', opts);
    }
  }
  