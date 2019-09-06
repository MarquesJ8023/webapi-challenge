const express = require ('express');
const projectsRoute = require('../data/helpers/projectModel.js'); 
const actionsRoute = require('../data/helpers/actionModel.js'); 
const router = express.Router();

router.get ('/:id', (req, res) => {
    const id = req.params.id;
    projectsRoute.get(id)
    .then((project) => {
        if(project.name) {
            res.status(200).json(project)
        }
    })
    .catch(() => {
        res.status(404).json({error: "Project not found!"});
    })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    projectsRoute.insert(newProject)
    .then((project) => {
        console.log('New project')
        res.status(201).json(project)
    })
    .catch(() => {
        res.status(501).json({error: "Post not created, please try again!"})
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const change = req.body;
    projectsRoute.update(id, change)
    .then(changeDone => {
        if(changeDone) {
            res.status(200).json({message: "Successfully changed project."})
        } else {
            res.status(500).json({error: "Change failed"})
        }
    })
    .catch(() => {
        res.status(500).json({error: "Change failed"})
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projectsRoute.remove(id)
        .then((IDdeleted) => {
            if(IDdeleted > 0) {
                res.status(200).json({message: "Project deleted"})
            } else {
                res.status(500).json({error: "Project not Deleted"})
            }
        })
});

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    projectsRoute.getProjectsActions(id)
        .then(actions => {
            if(actions[0]) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({error: "Action number not found"})
            }
        })
        .catch(() => {
            res.status(500).json({error: "Unable to retrieve action"})
        })
});

module.exports = router;