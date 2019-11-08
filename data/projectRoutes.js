const route = require('express').Router()

const projectsDb = require('./projectModel');

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

module.exports = route;