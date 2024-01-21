class HttpError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   **/
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const internalServerError = () => new HttpError("Internal Server Error", 500);
const malformedIdError = () => new HttpError("Malformed Id", 400);
const notFound = () => new HttpError("Not Found", 404);

export default {
  internalServerError,
  malformedIdError,
  notFound,
};
