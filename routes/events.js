import express from 'express';
import db from '../helpers/database'
import config from '../config.json';

const router = express.Router();

/**
 * Ping route to keep Heroku alive
 */
router.get('/ping', function(req, res) {
    res.status(200).json({ping: "success"});
});

/**
 * Get items array from FDB folder
 */
router.get('/items/:folder', function(req, res) {
    db.getItemsFromFolder(config.routes.events.layer, req.params.folder).then ((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });
});

/**
 * Get item data object by id from FDB folder
 */
router.get('/item/:folder/:id', function(req, res) {
    db.getItemById(config.routes.events.layer, req.params.folder, req.params.id).then ((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });
});

/**
 * Post item to FDB in folder by datestamp
 */
router.post('/', function(req, res) {
    let event = req.body;
    db.setItemInFolder(config.routes.events.layer, event, event.datestamp, event.id).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });
});

/**
 * Delete item with post method to provide datestamp as folder and id as unique key
 */
router.post('/delete', function(req, res) {
    let event = req.body;
    db.deleteItemFromFolder(config.routes.events.layer, event, event.datestamp, event.id).then((snap) => {
        res.status(200).json(snap);
    }, (err) => {
        res.status(500).json(err);
    });

});

module.exports = router;