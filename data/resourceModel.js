const db = require('./dbConfig');

const add = (details) => {
  return db('resources').insert(details);
}

const get = () => {
  return db('resources');
}

module.exports = {
  add,
  get
}