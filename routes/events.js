import express from 'express';
import db from '../helpers/database'
import config from '../config.json';

const router = express.Router();

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
    db.writeData(config.routes.events.layer, event).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });
});

/* DELETE */
router.post('/delete', function(req, res) {
    let event = req.body;
    db.deleteItem(config.routes.events.layer, event).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });

});

module.exports = router;