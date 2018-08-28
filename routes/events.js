import express from 'express';
import dbService from '../helpers/database'
import config from '../config.json';

const router = express.Router();
const REST = config.routes.events;


/* GET TEST */
router.get('', function(req, res) {
    res.status(200).json({events: "worked"});
});

/* POST */
router.post(REST.post, function(req, res) {
    let event = req.body;
    res.status(200).json({status: "added"});
});

/* DELETE */
router.delete(REST.delete, function(req, res) {
    let id = req.query.id;
    response.status(200).json({status: "deleted"});
});

module.exports = router;