import express from 'express';
import db from '../helpers/database'
import config from '../config.json';

const router = express.Router();
const REST = config.routes.events;


/* GET */
router.get('/', function(req, res) {
    db.readData(config.routes.events.layer).then ((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });

});

/* POST */
router.post('/', function(req, res) {
    let event = req.body;
    db.writeData(event, config.routes.events.layer, event.id).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });
});

/* DELETE */
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    db.deleteItem(config.routes.events.layer, id).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });

});

module.exports = router;