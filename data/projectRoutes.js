const route = require('express').Router();

const projectsDb = require('./projectModel');
const tasksDb = require('./taskModel');
const resourcesDb = require('./resourceModel');

route.get('/', (req, res) => {  
  projectsDb.get()
    .then(projects => {
      // console.log(projects);
      const modifiedProjects = projects.map(project => {
        if (project.completed === 0) {
          return {...project, completed: false};
        } else {
          return {...project, completed: true};
        }
      });
      res.status(200).send(modifiedProjects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting the projects from the database'});
    })
});

route.post('/', (req,res) => {
  const projectDetails = req.body;

  if(!projectDetails.name) {
    res.status(400).send({message: 'The project name is required'});
  } else {
    projectsDb.add(projectDetails)
      .then(id => {
        // console.log(id);
        res.status(201).send('Project Created');
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The project could not be created'})
      })
  }
});

route.post('/:id/tasks', (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);

  const taskDetails = req.body;
  console.log(taskDetails);

  if(!taskDetails.description) {
    res.status(400).send({message: 'The task description is required'});
  } else {
    tasksDb.add({...taskDetails, project_id: projectId})
      .then(id => {
        console.log(id);
        res.status(201).send({message: 'Task created'});
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The task could not be created'});
      })
  }
});

route.get('/:id/tasks', (req, res) => {
  tasksDb.getByProjectId(req.params.id)
    .then(tasks => {
      console.log(tasks);
      res.status(200).send(tasks);
    })
    .catch(error => {
      console.log(error);
      res.status(200).send({message: 'There was an error in getting tasks from the database'});
    })
});

module.exports = route;