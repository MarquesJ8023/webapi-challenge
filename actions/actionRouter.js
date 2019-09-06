const express = require ('express');

const Actions = require('../data/helpers/actionModel.js'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get(req.query); 
        res.status(200).json(actions);  
     } catch (error) {
         console.log(error); 
         res.status(500).json({message: "Error retrieving the projects."}); 
     }
});

router.get('/:id', validateActionId, async (req, res) => {
    try {
        const individualActions = await Actions.getById(req.params.id); 
        res.status(200).json(individualActions); 
    }catch (error) {
        console.log(error); 
        res.status(500).json({message: "Action not found"}); 
    }
});

router.delete('/:id', validateActionId, async (req, res) => {
    try {
        res.status(200).json( await Actions.remove(req.params.id) );    
    } catch(error) {
        console.log(error); 
        res.status(500).json({message: "Error removing acton."})
    }
});

router.put('/:id', validateActionId, async (req, res) => {
    try {
        res.status(200).json(await Actions.update(req.params.id, req.body)); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "Error updating action."})
    }
});

function validateActionId(req, res, next) {
    if(!req.params.id) {
        res.status(400).json({message: "invalid action id"})
    } else {
        req.action = `${req.params.id}`; 
    } next(); 
};

module.exports = router;
