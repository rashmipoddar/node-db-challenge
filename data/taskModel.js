const db = require('./dbConfig');

const add = (details) => {
  return db('tasks').insert(details);
}

const get = () => {
  return db('tasks');
}

const getByProjectId = (projectId) => {
  return db
    .select('projects.name', 'projects.description as projectDescription' , 'tasks.id', 'tasks.description as taskDescription', 'tasks.notes', 'tasks.completed')
    .from('projects')
    .innerJoin('tasks', 'projects.id', 'tasks.project_id')
    .where({'tasks.project_id': projectId})
}

module.exports = {
  add,
  get, 
  getByProjectId
}