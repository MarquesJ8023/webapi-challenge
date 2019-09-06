const express = require ('express');
const actionsRoute = require('../data/helpers/actionModel.js'); 
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    actionsRoute.get(id)
        .then(action => {
            if(action) {
                res.status(200).json(action)
        
            } else {
                res.status(404).json({error: "Action not found"})
            }
        })
        .catch(() => {
            res.status(500).json({error: "Action could not be gotten"})
        })
});

router.post('/', (req, res) => {
    const action = req.body;
    actionsRoute.insert(action)
        .then((action) => {
            console.log("Action created!")
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(501).json({error: "Action not created"})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionsRoute.remove(id)
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
