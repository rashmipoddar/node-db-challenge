const db = require('./dbConfig');

const add = (details) => {
  return db('projects').insert(details);
}

const get = () => {
  return db('projects');
}

module.exports = {
  add,
  get
}