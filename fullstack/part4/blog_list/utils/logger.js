const info = (/** @type {any[]} */ ...params) => {
  console.log(...params);
};

const error = (/** @type {any[]} */ ...params) => {
  console.error(...params);
};

export default {
  info,
  error,
};
