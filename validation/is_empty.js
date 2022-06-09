// function isEmpty(value) {
//     return (
//         value === undefined ||
//         value === null ||
//         (typeof value === 'object' && Object.keys(value).length === 0) ||
//         (typeof value === 'string' && value.trim().length === 0)
//     )
// }

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const queryToString = (value) => {
  return (value = isEmpty(value) ? "" : value);
};

module.exports = {
  isEmpty,
  queryToString,
};
