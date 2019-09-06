const express = require ('express');
const Projects = require('../data/helpers/projectModel.js'); 
const Actions = require('../data/helpers/actionModel.js'); 
const router = express.Router();

router.post('/', validateProject, async (req, res) => {
    try {
        const newAcct = await Projects.insert(req.body); 
        res.status(200).json(newAcct); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "error adding Project"});
    }
});

router.post('/:id/actions', validateAction, async (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id}; 
    try {
        const newAction = await Actions.insert(actionInfo); 
        res.status(200).json(newAction); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "error adding Action"})
    }
    
});

router.get('/', async (req, res) => {
    try {
       const accounts = await Projects.get(req.query); 
       res.status(200).json(accounts);  
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "Error retrieving the projects."}); 
    }
});

router.get('/:id', async (req, res) => {
    try {
        const individualAcct = await Projects.getById(req.params.id); 
        res.status(200).json(individualAcct);
    }catch (error) {
        console.log(error); 
        res.status(500).json({message: "project not found"}); 
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const actions = await Actions.getById(req.params.id); 
        res.status(200).json(actions); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "actions not found"})
    }
});

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        res.status(200).json( await Projects.remove(req.params.id) );    
    } catch(error) {
        console.log(error); 
        res.status(500).json({message: "Error removing project."})
    }
});

router.put('/:id', validateProjectId, async (req, res) => {
    try {
        res.status(200).json(await Projects.update(req.params.id, req.body)); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "Error updating project."})
    }
});

  function validateProjectId(req, res, next) {
    if (!req.params.id) {
      res.status(400).json({message: "invalid project id"});
    } else {
      req.project = `${req.params.id}`; 
      next(); 
    }
  }

function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({message: "missing project data"});
    } else if (!req.body.name) {
        res.status(400).json({message: "missing required name field"})
    } 
    next(); 
};

function validateAction(req, res, next) {
    if(!req.body) {
        res.status(400).json({message: "missing action data"});
    } else if (!req.body.text) {
        res.status(400).json({message: "missing required text field"});
    } next(); 
};

module.exports = router;