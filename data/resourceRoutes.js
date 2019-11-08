const route = require('express').Router();

const resourcesDb = require('./resourceModel');

route.get('/', (req, res) => {  
  resourcesDb.get()
    .then(resources => {
      // console.log(resoures);
      res.status(200).send(resources);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting the resources from the database'});
    })
});

route.post('/', (req,res) => {
  const resourceDetails = req.body;

  if(!resourceDetails.name) {
    res.status(400).send({message: 'The resource name is required'});
  } else {
    resourcesDb.add(resourceDetails)
      .then(id => {
        // console.log(id);
        res.status(201).send('Resource Created');
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The resource could not be created'})
      })
  }
});

module.exports = route;


